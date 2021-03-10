import { Component, OnInit, ɵConsole } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, NavigationError, Event, NavigationStart } from '@angular/router';
import { Breadcrumb } from 'src/app/core/models/breadcrumb/breadcrumb';
import { distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  public breadcrumbs: Breadcrumb[];
  public url: string;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
  }
  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      distinctUntilChanged(),
    ).subscribe(() => {
      this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
    });
  }

  buildBreadCrumb(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    let label = route.routeConfig && route.routeConfig.data ? route.routeConfig.data.breadcrumb : '';
    let path = route.routeConfig && route.routeConfig.data ? route.routeConfig.path : '';
    const lastRoutePart = path.split('/').pop();
    const isDynamicRoute = lastRoutePart.startsWith(':');
    if (isDynamicRoute && !!route.snapshot) {
      const paramName = lastRoutePart.split(':')[1];
      path = path.replace(lastRoutePart, route.snapshot.params[paramName]);
      label = route.snapshot.params[paramName];
      const pathObject = window.location.pathname;
      const urlAll = pathObject.split('/');
      const urlText = [];
      for (const item of urlAll) {
        if (item !== '' && isNaN(Number(item))) {
          urlText.push(item);
        }
      }
      const UrlFather = urlText[urlText.length - 2];
      const urlValidate = path.split('/');
      const urlId = urlValidate[urlValidate.length - 1];
      // tslint:disable-next-line: radix
      const urlId2 = parseInt(urlId);
      const dataSession = JSON.parse(sessionStorage.getItem('bread'));

      for (const item of dataSession) {
        if (UrlFather === item.url) {
          for (const item2 of item.data) {
            if (item2.id === urlId2) {
              label = item2.name;
            }
          }
        }
      }
    }
    const nextUrl = path ? `${url}/${path}/` : url;
    const breadcrumb: Breadcrumb = {
      label: label,
      url: nextUrl
    };
    const newBreadcrumbs = breadcrumb.label ? [...breadcrumbs, breadcrumb] : [...breadcrumbs];
    if (route.firstChild) {
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
  }
}
