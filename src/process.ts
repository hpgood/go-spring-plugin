
import * as vscode from 'vscode';


interface beanT {
    name: String;
    type: String;
    bean: String;
}
export class CodeProcess {

    constructor( ) {}

    private reStructReg: RegExp = /type[\s]+([A-Za-z0-9]+)[\s]+struct[\s]+{?/;

    private reLastReg: RegExp = /[\s]?}[\s]?/;
    private reBeanReg: RegExp = /[\s]*([A-Za-z0-9_]+)[\s]+([\*\s]*[A-Za-z0-9_\.]+)[\s]+`.*bean:[\s]*"([A-Za-z0-9_]+)".*`[\s]*/;
    private reNameReg: RegExp = /[\s]*([A-Za-z0-9_]+)[\s]+([\*\s]*[A-Za-z0-9_\.]+)[\s]*/;

 
    /**
     * transform px to rpx
     *
     * @param {string} code origin text
     * @return {string} transformed text
     */
    convert(text: string) {
        let match = text.match(this.reStructReg);
      
    }

    /**
     * convert setter
     *
     * @param {string} code origin text
     * @return {string} transformed text
     */
    convertSetter(structCode: string,fullText: string): string {
        if (!structCode) return structCode;

 
        let arr=structCode.split("\n");
        // vscode.window.showInformationMessage('>arr.size='+arr.length);
        let isStruct=false;
        let hasLast=false;
        let structName="";

        // type beanT={bean:'',type:''};

        let beans:Array<beanT>=[];
        arr.forEach(element => {
            if(isStruct){
                let beanResult=element.match(this.reBeanReg);
                
                // vscode.window.showInformationMessage('check:beanResult='+beanResult);

                if(beanResult && beanResult.length>=4 ){
   
                    let name=beanResult[1];
                    let beanType=beanResult[2];
                    let bean=beanResult[3];
                    let obj={name,bean,type:beanType};
                    beans.push(obj);
                }
                if(element.match(this.reLastReg)){
                    hasLast=true;
                }
            }else{
                let r=element.match(this.reStructReg);
 
                if(r && r.length>=2){
                    // vscode.window.showInformationMessage('check:result.length='+r.length+'r0='+r[0]+'r1='+r[1]);
                    structName=r[1];
                    isStruct=true;
                } 
            }
            
        });

        let setter="";
        if(isStruct && hasLast ){

            // vscode.window.showInformationMessage('beans.size='+beans.length);
            // setter+="//bean setter start\n";
            beans.forEach((item)=>{
                let bean=item.bean;
                let beanType=item.type;
                let name=item.name;
                let beanUpper=name.substring(0,1).toUpperCase()+name.substring(1);

                let methodName=`Set${beanUpper}`;

                if(!fullText.includes(methodName)){
                    setter+= `\n`;
                    setter+= `// set ${name} by bean:${bean}\n`;
                    setter+= `func (t *${structName}) ${methodName}(arg ${beanType}) {\n`;
                    setter+= `\tt.${name} = arg\n`;
                    setter+= "}\n";
                }

              
            });
            // setter+="//bean setter end\n";
           
        }
        if(!hasLast){
            vscode.window.showInformationMessage("not match the end of struct: \"}\"");
        }

        
        return setter ;

    }

    autoAddTag(code: string): string{
        let arr=code.split("\n");
        let ret:Array<string>=[];
        arr.forEach((item)=>{
            let d=item;
            let beanResult=item.match(this.reBeanReg);
            let r=item.match(this.reNameReg);
            if(!beanResult &&  r && r.length>=2 ){
                let name=r[1];
                let snake=name.replace(/([A-Z])/g, "_$1").toLowerCase();
                // let beanType=r[2];
                let str=`${d} `+"`bean:\""+snake+"\"`";
                ret.push(str);
            }else{
                ret.push(d);
            }
        });
        return ret.join("\n");
    }

    convertBeanName(structCode: string,fullText: string): string {
        if (!structCode) return structCode;

 
        let arr=structCode.split("\n");
        // vscode.window.showInformationMessage('>arr.size='+arr.length);
        let isStruct=false;
        let hasLast=false;
        let structName="";

        // type beanT={bean:'',type:''};

        let beans:Array<beanT>=[];
        arr.every(element => {
            if(isStruct){
                if(element.match(this.reLastReg)){
                    hasLast=true;
                    return false;
                }
            }else{
                let r=element.match(this.reStructReg);
                if(r && r.length>=2){
                    // vscode.window.showInformationMessage('check:result.length='+r.length+'r0='+r[0]+'r1='+r[1]);
                    structName=r[1];
                    isStruct=true;
                } 
            }
            return true;
        });

        let setter="";
        if(isStruct && hasLast ){

            let checkStr=` ${structName}) Name()`;
            if(!fullText.includes(checkStr)){
                let snake=structName.replace(/([A-Z])/g, "_$1").toLowerCase();
                if(snake.substring(0,1)==='_'){
                    snake=snake.substring(1);
                }
                setter+= `\n`;
                setter+= `// Name \n`;
                setter+= `func (t ${structName}) Name() string {\n`;
                setter+= `\treturn "${snake}"\n`;
                setter+= "}\n";
            }
        }
        if(!hasLast){
            vscode.window.showInformationMessage("not match the end of struct: \"}\"");
        }

        
        return setter ;

    }
}