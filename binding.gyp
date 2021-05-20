{
    "targets":[
          {
            "target_name": "AnomalyModule",
            "cflags!": [ "-fno-exceptions" ],
            "cflags_cc!": [ "-fno-exceptions" 
            ],
            "sources": [
                "./src/anomaly_detection_util.cpp",
                "./src/timeseries.cpp",
                "./src/minCircle.cpp",
                "./src/SimpleAnomalyDetector.cpp",
                "./src/HybridAnomalyDetector.cpp",                
                "./src/AnomalyDetector.h",
                "./src/AnomalyAlg.cpp",
                "./src/AnomalyAddon.cpp"                
            ],
            "include_dirs": [
                "<!@(node -p \"require('node-addon-api').include\")"
            ],
            'defines': [
                'NAPI_DISABLE_CPP_EXCEPTIONS' ],
            'xcode_settings': {
                'GCC_ENABLE_CPP_EXCEPTIONS': 'YES',
                'CLANG_CXX_LIBRARY': 'libc++',
                'MACOSX_DEPLOYMENT_TARGET': '10.7'
            },
            'msvs_settings': {
               'VCCLCompilerTool': { 'ExceptionHandling': 1 },
            }
          }
        ]            
}