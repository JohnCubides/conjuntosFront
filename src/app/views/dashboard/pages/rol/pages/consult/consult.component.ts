import { Component, OnInit } from '@angular/core';
import { RolAndPermissions } from 'src/app/core/models/rol-and-permissions/rol-and-permissions';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/https/http.service';

@Component({
  selector: 'app-consult',
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.scss']
})
export class ConsultComponent implements OnInit {

  public loading = false;
  public jsonRol: RolAndPermissions = {
    name: '',
    permits: []
  };

  constructor(private api: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getPermits();
  }
  private getPermits() {
    this.api.post('/roles/rolwithpermits', { idrol: this.route.snapshot.paramMap.get('id') }).then((result: any) => {
      this.jsonRol = result.data;
      this.loading = true;
    });
  }

}
