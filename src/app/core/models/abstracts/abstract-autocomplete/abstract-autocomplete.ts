import { AutocompleteService } from 'src/app/core/services/autocomplete/autocomplete.service';
import { Injector } from '@angular/core';
import { AbstractModal } from '../abstract-modal/abstract-modal';

export abstract class AbstractAutocomplete extends AbstractModal {
    protected autocompleteService: AutocompleteService;
    public dataIds: { id: string, text: string }[] = [];

    constructor(injector: Injector) {
        super(injector);
        this.autocompleteService = injector.get(AutocompleteService);
    }

    protected autocomplete(dataId: string, textData: string, dataList?: any[]) {
        if (dataList && dataList.length === 0) {
            dataList = this.changesDataList(['Resultado no encontrado'], 'home');
        }
        this.autocompleteService.AutocompleteTemplate({ id: dataId, text: textData, data: dataList });
    }

    protected changesDataList(data: string[], classIcon: string): { row: string, class: string }[] {
        const list = [];
        data.forEach(e => {
          list.push({row: e, class: classIcon});
        });
        return list;
    }
}
