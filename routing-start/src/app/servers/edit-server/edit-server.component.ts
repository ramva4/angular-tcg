import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params} from '@angular/router';
import { CanComponentDeactivate } from './can-deactivate-guard';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit: boolean;
  showChangesSaved: boolean = false;

  constructor(private serversService: ServersService, private route: ActivatedRoute) { }

  canDeactivate(): boolean | Promise<boolean> | Observable<boolean> {
    if (!this.allowEdit) return true;
    if (this.dataChanged())  {
      return confirm('Lose changes?');
    } else {
      return true;
    }
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    /*  Get the current server details from the param (id) selected
        and set a listener to dynamically update this.server when params change
      */
    this.server = this.serversService.getServer(+id);
    this.route.params.subscribe((params) => {
      this.server = this.serversService.getServer(+params['id']);
    });
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
    this.route.queryParams.subscribe((queryParams: Params) => {
      this.allowEdit = (queryParams['allowEdit'] === '1');
    })
  }

  dataChanged(): boolean {
    return ((this.server.name !== this.serverName) || (this.server.status !== this.serverStatus));
  }

  onUpdateServer() {
    if (!this.dataChanged()) return;
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.showChangesSaved = true;
    setTimeout(() => this.showChangesSaved = false, 2000);
  }

}
