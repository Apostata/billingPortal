export default class Utils{
    static removePropFromObject(objeto, prop){
        return Object.keys(objeto).reduce((object, key) => {
            if (key !== prop) {
              object[key] = objeto[key]
            }
            return object
        }, {});
    }
}