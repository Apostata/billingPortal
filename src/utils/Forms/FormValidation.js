import errorMessages  from '../../json/validationMessages.json';

export default class Validation{
   static valid = true;
   static rule = "";

    static fieldValidation(label, value, rules){
        if(rules){
            const fieldRules = rules.split('|');
            
            fieldRules.map((rule)=>{
               
                let upperCaseRule = rule.replace(/\b\w/g, l => l.toUpperCase());
                
                if(Validation.valid === true){
                    if(rule !== 'required'){
                        if(value.length <= 0){
                            if(!fieldRules.includes('required')){
                                Validation.rule =  null;
                            }
                            else{
                                Validation.rule =  'required';
                            }
                        }
                        else{
                            Validation.rule =  rule;
                        }
                    }
                    else{
                        Validation.rule =  rule;
                    }

                   Validation.valid = Validation.rule ? Validation[`is${upperCaseRule}`](value) : true;
                }
            });
        }
        let errorMessage
        if(!Validation.valid){
            errorMessage = Validation.errorMessage(label, Validation.rule)
        }
        else{
            errorMessage =  null;
        }

        Validation.valid = true;
        return errorMessage;
    }

    static isRequired(value){
        return value ? String(value).trim() !== '' : false;
    }

    static isEmail(value){
        if(value.length > 0){
            const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            return regex.test(value);
        }
    }

    static isPhone(value){
        console.log(value.length);
        if(value.length > 0){
            const regex = /^\([0-9]{2}\)\s+[0-9]{4}\-[0-9]{4,5}$/;
            return regex.test(value);
        }
    }

    static errorMessage(campo, rule){
        console.log(campo);
        let message = errorMessages[rule];
        message = message.replace(/\{campo\}/g, campo);
        console.log(message);
        return message;
    }
}