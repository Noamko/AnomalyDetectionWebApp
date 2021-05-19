// Noam Koren 308192871
#include <dirent.h>
#include <stdio.h>
#include <unistd.h>
#include <sys/stat.h>
#include <stdlib.h>
#include <sys/types.h>
#include <sys/fcntl.h>
#include <string.h>
#include <time.h>

#define INPUT_SIZE 150
typedef struct student_report {
	int score;
	const char* name;
	const char* r_info;
}student_report;

int isDirectory(const char* path) {
	struct stat statbuf;
	if (stat(path, &statbuf) != 0)
		return 0;
	return S_ISDIR(statbuf.st_mode);
}

void set_output(const char* file) {
	int out = open(file, O_WRONLY | O_CREAT, 0666);
	if (out < 0) {
		printf("Output file not exist");
	}
	if (dup2(out, STDOUT_FILENO) < 0) {
		//errorno
	}
	close(out);
}

void set_input(const char* file) {
	int in = open(file, O_RDONLY);
	if (in < 0) {
		printf("Input file not exist");
		exit(-1);
	}
	if (dup2(in, STDIN_FILENO) < 0) {
		printf("unable to dup stdin\n");
		//need to do errrono
	}
	close(in);
}

void set_error(const char* file) {
	int err = open(file, O_WRONLY | O_CREAT, 0666);
	if (dup2(err, STDERR_FILENO) < 0) {
		printf("failed to dup err");
	}
	close(err);
}

int isCFile(const char* file) {
	int len = strlen(file);
	if (len >= 3) {
		if (file[len - 2] == '.' && file[len - 1] == 'c') {
			return 1;
		}
	}
	return 0;
}

int compile_and_run(const char* c_file, const char* input_file, const char* output_file) {
	pid_t pid = fork();
	if (pid == 0) {
		pid_t pid2 = fork();
		if (pid2 == 0) {
			char* argv[5];
			char temp_c[1024];
			strcpy(temp_c, c_file);
			argv[0] = "gcc";
			argv[1] = temp_c;
			argv[2] = "-o";
			argv[3] = "temp.out";
			argv[4] = NULL;
			if (execvp("gcc", argv) < 0) {
				exit(-1);
			}
		}
		else {
			int gcc_status;
			waitpid(pid2, &gcc_status, 0);
			int gcc_estat = WEXITSTATUS(gcc_status);
			if (gcc_estat < 0) {
				exit(-1);
			}
			set_input(input_file);
			set_output(output_file);
			if (execl("./temp.out", (char*)NULL) < 0) {
				exit(2);
			}
		}
	}
	int status;
	waitpid(pid, &status, 0);
	int p_estat = WEXITSTATUS(status);
	if (p_estat < 0) {
		//error gcc didnt run
		//should never get here.
		return -1;
	}
	if (p_estat == 2) {
		//comile error
		return 0;
	}
	return 1;
}

int compareFiles(const char* comp, const char* file1, const char* file2) {
	pid_t pid = fork();
	if (pid == 0) {
		if (execl(comp, "comp.out", file1, file2, (char*)NULL) < 0) {
			printf("failed to exec");
			exit(-1);
		}
	}
	else {
		int status;
		waitpid(pid, &status, 0);
		return WEXITSTATUS(status);
	}
	return -1;
}

int check_student(const char* folder, const char* inputfile, const char* currect_output, const char* comp) {
	DIR* dir = opendir(folder);
	if (dir == NULL) {
		//errorno
		printf("error");
	}

	struct dirent* dn;
	chdir(folder);
	int score = 0;
	while ((dn = readdir(dir)) != NULL) {
		const char* file = dn->d_name;
		if (isCFile(file)) { // c file found.
			char output_file[1024];
			getcwd(output_file, 1024);
			strcat(output_file, "/");
			strcat(output_file, "output.txt");
			time_t begin, end;
			time(&begin);
			int run_result = compile_and_run(file, inputfile, output_file);
			time(&end);
			if (run_result < 0) {
				exit(-1);
			}
			time_t elapsed = end - begin;
			int comp_result = compareFiles(comp, output_file, currect_output);
			if (run_result == 1) {
				if (elapsed > 5) {
					score = 20;
				}
				else if (comp_result == 1) {
					score = 100;
				}
				else if (comp_result == 2) {
					score = 50;
				}
				else if (comp_result == 3) {
					score = 75;
				}
			}
			else { // didnt compile
				score = 10;
			}
			remove("output.txt");
			remove("temp.out");
			break;
		}
	}

	closedir(dir);
	chdir("..");
	return score;
}

void eex(const char* path) {
	int fd = open(path, O_RDONLY);
	if (fd < 0) {
		printf("failed to open file\n");
		exit(-1);
	}
	char buffer[INPUT_SIZE + 1];
	int bytes_read = INPUT_SIZE;
	bytes_read = read(fd, buffer, INPUT_SIZE); //taking a risk here that file content is larger then 2048 (not likly at all)
	close(fd);
	set_error(("errors.txt"));
	const char* _dir = strtok(buffer, "\n");

	char _input_file[1024];
	getcwd(_input_file, 1024);
	strcat(_input_file, "/");
	strcat(_input_file, strtok(NULL, "\n"));


	char _correct_output_file[1024];
	getcwd(_correct_output_file, 1024);
	strcat(_correct_output_file, "/");
	strcat(_correct_output_file, strtok(NULL, "\n"));

	char comp[1024];
	getcwd(comp, 1024);
	strcat(comp, "/");
	strcat(comp, "comp.out");

	DIR* dir = opendir(_dir);
	if (dir == NULL) {
		printf("Not a valid directory\n");
		exit(-1);
	}
	struct dirent* dn;
	chdir(_dir);

	char result[2048];
	strcpy(result, "");
	while ((dn = readdir(dir)) != NULL) {
		char* folder = dn->d_name;
		if (isDirectory(folder) && strcmp(folder, "..") != 0 && strcmp(folder, ".") != 0) {
			int student_score = check_student(folder, _input_file, _correct_output_file, comp); // look for a .c file compile and run it.
			strcat(result, folder);
			strcat(result, ",");
			if (student_score == 100) {
				strcat(result, "100,EXCELLENT\n");
			}
			else if (student_score == 75) {
				strcat(result, "75,SIMILAR\n");
			}
			else if (student_score == 50) {
				strcat(result, "50,WRONG\n");
			}
			else if (student_score == 20) {
				strcat(result, "20,TIMEOUT\n");
			}
			else if (student_score == 10) {
				strcat(result, "10,COMPILATION_ERROR\n");
			}
			else if (student_score == 0) {
				strcat(result, "0,NO_C_FILE\n");
			}
		}
	}

	//Cleanup
	chdir("..");
	int csv_file = open("results.csv", O_CREAT | O_WRONLY, 0666);
	write(csv_file, result, strlen(result));
	close(csv_file);
	closedir(dir);
}

int main(int argc, char* argv[]) {
	if (argc < 2) {
		printf("not enough args\n");
		exit(-1);
	}
	eex(argv[1]);
	return 0;
}
