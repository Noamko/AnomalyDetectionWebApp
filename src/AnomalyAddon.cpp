#include <napi.h>
#include <string>
#include "AnomalyAlg.h"

#define CORR_FEATURE1 "Coralated Feture_1"
#define CORR_FEATURE2 "Coralated Feture_2"
#define TIME_STEP "Time Step"
#define SEPERATOR " <---> "
// native C++ function that is assigned to 'greetHello' property on 'exports' objexct
Napi::Array simpleDetect(const Napi::CallbackInfo& info) {
    
    Napi::Env env = info.Env();

    std::string pathData = (std::string) info[0].ToString();
    std::string pathTest = (std::string) info[1].ToString();
    
    std::vector<AnomalyReport> reports = detectForLinearReg( pathData, pathTest );
    Napi::Array result_list = Napi::Array::New(env);
    int counter = 0 ;
    for(AnomalyReport report : reports){
        string delimiter = SEPERATOR;
        int pos = report.description.find(delimiter);
        string feture1 = report.description.substr(0,pos);
        string feture2 = report.description.substr(pos + delimiter.length(),report.description.length());
        Napi::Object jsData = Napi::Object::New(env);
        jsData.Set(TIME_STEP,report.timeStep);
        jsData.Set(CORR_FEATURE1,feture1);
        jsData.Set(CORR_FEATURE2,feture2);
        result_list.Set(counter, jsData);
        counter++;
    }
    return result_list; 
}
Napi::Array hybridDetect(const Napi::CallbackInfo& info) {

    Napi::Env env = info.Env();

    std::string pathData = (std::string) info[0].ToString();
    std::string pathTest = (std::string) info[1].ToString();

    std::vector<AnomalyReport> reports = detectForCircle( pathData, pathTest );
    Napi::Array result_list = Napi::Array::New(env);
    int counter = 0 ;
    for(AnomalyReport report : reports){
        string firstFeature = report.description.substr(0, report.description.find(SEPERATOR));
        if (counter == 0) std::cout<<firstFeature<<std::endl;
        string secondFeature = report.description.substr(report.description.find(SEPERATOR)+7,report.description.length());
        Napi::Object jsData = Napi::Object::New(env);
        jsData.Set(TIME_STEP,report.timeStep);
        jsData.Set(CORR_FEATURE1,firstFeature);
        jsData.Set(CORR_FEATURE2,secondFeature);
        result_list.Set(counter, jsData);
        counter++;
    }
    return result_list;    
}
// callback method when module is registered with Node.js
Napi::Object Init(Napi::Env env, Napi::Object exports) {

    // set a key on 'exports' object
    exports.Set(
        Napi::String::New(env, "linearDetect"),
        Napi::Function::New(env, simpleDetect) 
    );
    exports.Set(
        Napi::String::New(env, "circleDetect"), 
        Napi::Function::New(env, hybridDetect) 
    );

    // return 'exports' object (always)
    return exports;
}

// register 'greet' module which calls 'Init' method
NODE_API_MODULE(AnomalyModule, Init)