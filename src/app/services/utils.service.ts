import { LazyLoadDto } from '../model/lazyLoadDto';
import { Injectable } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';



@Injectable({ providedIn: 'root' })
export class 
UtilsService {

    public base64toBlob(base64Data, contentType) {
        contentType = contentType || '';
        let sliceSize = 1024;
        let byteCharacters = atob(base64Data);
        let bytesLength = byteCharacters.length;
        let slicesCount = Math.ceil(bytesLength / sliceSize);
        let byteArrays = new Array(slicesCount);
        for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
            let begin = sliceIndex * sliceSize;
            let end = Math.min(begin + sliceSize, bytesLength);

            let bytes = new Array(end - begin);
            for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
                bytes[i] = byteCharacters[offset].charCodeAt(0);
            }
            byteArrays[sliceIndex] = new Uint8Array(bytes);
        }
        return new Blob(byteArrays, { type: contentType });
    }

  

    getLazyDto(event: LazyLoadEvent, campoOrdenacao?: String, ordemOrdenacao?): LazyLoadDto {

        let lazyLoad = null;

        if (event != null && event != undefined) {
            lazyLoad = new LazyLoadDto();
            lazyLoad.pagina = event.first;
            lazyLoad.linhas = event.rows;
            

            if (campoOrdenacao != null && ordemOrdenacao != null) {
                lazyLoad.campoOrdenacao = campoOrdenacao;
                lazyLoad.ordemOrdenacao = ordemOrdenacao
            }
        } else {
            lazyLoad = new LazyLoadDto();
        }
        return lazyLoad;
    }

    format(date: Date): string {
        if (date) {
          let day: string = date.getDate().toString();
          day = +day < 10 ? "0" + day : day;
          let month: string = (date.getMonth() + 1).toString();
          month = +month < 10 ? "0" + month : month;
          let year = date.getFullYear();
          return `${day}/${month}/${year}`;
        }
    
        return null;
      }


}