import { HttpParams } from '@angular/common/http';

export class Filter {

    private static removeEmptyObject(obj: any) {
        for (const key in obj) {
            let keyObj = Reflect.get(obj, key);
            if(keyObj === null || keyObj === '') {
                Reflect.set(obj, key, undefined);
            }else if(typeof(keyObj) == 'object') {
                Filter.removeEmptyObject(keyObj);
            }
        }
    }

    public removeEmpty() {
        Filter.removeEmptyObject(this);
    }

    private static convertObjectToParams(obj: any){
        let params = new HttpParams();
        for (const key in obj) {
            let keyObj = Reflect.get(obj, key);
            if (typeof(keyObj) == 'function') {
                continue;
            }
            params = params.append(key, keyObj);
        }
        return params;
    }

    public convertToParams(){
        return Filter.convertObjectToParams(this);
    }

}