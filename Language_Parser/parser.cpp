#include <string>
#include <vector>
#include <fstream>
#include <iostream>
#include <cstring>

using namespace std;

char filename[56];
char output[100];
ifstream fp;
int phpflag = 0, javaflag = 0, rubyflag = 0;
vector <string> classes;
vector <string> methods;

/** classes holding method declaration of methods like identifyLang, readFile
**/ 
class InterpretLanguage {
	public :
		void identifyLang(char filename[]);
		void readFile(char filename[]);
		void isPhp(char filename[]);
		void isRuby(char filename[]);
		void isJava(char filename[]);
		void display();
};
/** method for identifies language, call methods of particular language 
to get class name and methods present
**/
void InterpretLanguage::identifyLang(char *filename) {
	InterpretLanguage language;                                  //language is object of class InterpretLanguage
	string file = filename;					     //string variable to store file name	
	file = file.substr(0, file.find_last_of( '.' ));             //removes extension of file
	if (fp.is_open()) {                                            // check wheather file is open or not
 		while (!fp.eof()) {
			fp >> output;
			if(strcmp(output, "<?php")==0 ) {
				phpflag = 1;                            //sets phpflag = 1 if language is php
				language.isPhp(filename);
			}
			else if((strcmp(output,"def")==0)|| (strcmp(output,"end") ==0 )) {
				rubyflag = 1;                             //sets rubyflag = 1 if language is php
				language.isRuby(filename);
			}
			else if ((strcmp(output,"public")==0) || (strcmp(output,"private")==0)  || (strcmp(output,"class")==0)) {
				fp>> output;
				if((strcmp(output,"class")==0) || output == file) {   //check class name and file name. if same then langiage is java &set flag to 1
					fp >> output;
					if(output == file) {
						javaflag =1;
						classes.push_back(output);
						cout << "java" << endl;
						language.isJava(filename);
					}
				}
			}
		}
		
	}
}
/** Method for php which identifies classes and methods in php
**/
void InterpretLanguage::isPhp(char *filename) {
	if (fp.is_open()) {
 		while (!fp.eof()) {
			fp >> output;
			if(strcmp(output,"class")==0) {                     //occurance of class keyword in php
				fp>>output;
				classes.push_back(output);		   //push class names in vector
			}
			else if(strcmp(output,"function")==0) {           //occurance of function keyword in php
				fp>>output;
				methods.push_back(output);               //push function names in vector
			}
			else
				continue;
		}
	}
}
/** Method for ruby which identifies classes and methods in ruby
**/
void InterpretLanguage::isRuby(char *filename) {
	if (fp.is_open()) {
 		while (!fp.eof()) { 
			fp >> output;
			if((strcmp(output,"class")==0) ) {		//occurance of class keyword in ruby
				fp >> output;
				classes.push_back(output);		//push class names in vector
			}
			else if((strcmp(output,"def")==0) ) {		//occurance of def keyword in ruby
				fp >> output;
				methods.push_back(output);		 //push function names in vector
			}
		}
	}
}
/** Method for java which identifies classes and methods in Javaa
**/
void InterpretLanguage::isJava(char *filename){
	if (fp.is_open()) {
 		while (!fp.eof()) {
			fp >> output;
			if((strcmp(output,"public")==0) || (strcmp(output,"private")==0) || (strcmp(output,"protected")==0) ) {
				fp>>output;
				if((strcmp(output,"String")==0) || (strcmp(output,"void")==0) || (strcmp(output,"Long")==0)||(strcmp(output,"Double")==0)) {
					fp>>output;
					methods.push_back(output);		 //push function names in vector
				}	
			}
		}		
	}
}
/* Method for displaying output on console, 
It tells user about language, methods and classes in input file 
*/
void InterpretLanguage::display() {
	cout << "Language :" << "  ";
	if(javaflag == 1) 
		cout << "Java"<<endl;
	else if(rubyflag == 1)
		cout << "ruby" <<endl;
	else if(phpflag == 1)
		cout << "PHP" <<endl;
	else
		cout<< "Language is neither Java, ruby, nor PHP" << endl;
	cout<< "............class are..........." <<endl;
	for (int i = 0; i < classes.size(); i++) {
		cout << endl;
		cout << classes.at(i) <<endl;
	}
	cout<< "........... Methods are.........." <<endl;
	for (int i = 0; i < methods.size(); i++) {
		cout << endl;
		cout <<methods.at(i) <<endl;
	}
	
	
}
/*Main function which cretes object of class InterpretLanguage 
and call identifyLang method**/
int main() {
	cout << "Enter name of file" <<endl;                            //Take input from user
	cin>>filename;
	fp.open(filename,ios::in);					//open file
	InterpretLanguage object;                                       //Creating object of class InterpretLanguage to call all methods inside it.	
	object.identifyLang(filename);                                  //calling identifyLang method 
	object.display();
	fp.close();							//close file
	
}
