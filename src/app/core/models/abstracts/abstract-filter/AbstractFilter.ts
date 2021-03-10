import { AbstractAutocomplete } from '../abstract-autocomplete/abstract-autocomplete';
import { BaseFilterService } from 'src/app/core/services/filter/base-filter.service';
import { Injector } from '@angular/core';
import { BaseFilter } from '../../filter/base-filter';
export abstract class AbstractFilter extends AbstractAutocomplete {
    public filterService: BaseFilterService;
    public placeholder = '';
    constructor(injector: Injector) {
        super(injector);
        this.filterService = injector.get(BaseFilterService);
    }
    public searchFilter(search: any) {
        let value = '';
        if (search.search) {
            value = search.search;
        }
        this.consultFilter(search.data, search.id);
        //   this.getRoleWithKeyword(value, id, search.data);
    }
    public templateSearch(data: any[]) {
        const filterBase: BaseFilter = {
            id: 'filterId',
            placeholder: this.placeholder,
            data: this.changesDataList(data, 'icon_home')
        };
        this.filterService.FilterTemplate(filterBase);
    }
    public consultFilter(dataFilter: string[], dataId: string | undefined, icon?: string) {
        if (dataId === 'General') {
            this.templateSearch(dataFilter);
        } else {
            this.dataIds.forEach(data => {
                this.autocomplete(data.id, data.text, data.id === dataId ? this.changesDataList(dataFilter, icon) : undefined);
            });
        }
    }
}
