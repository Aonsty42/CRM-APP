import { Pipe, PipeTransform } from '@angular/core';
import { Utils } from 'src/app/shared/utils/index';

@Pipe({name: 'filter'})
export class FilterPipe implements PipeTransform
{
    /**
     * Transform
     *
     * @param {any[]} mainArr
     * @param {string} searchText
     * @param {string} property
     * @returns {any}
     */
    transform(mainArr: any[], searchText: string, property: string): any
    {
        if(!searchText) return mainArr;
        return Utils.filterArrayByString(mainArr, searchText);
    }
}
