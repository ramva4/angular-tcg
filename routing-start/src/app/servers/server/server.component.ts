import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: { id: number, name: string, status: string };

  constructor(private serversService: ServersService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    /* The leading + converts the string into Number */
    /* this.route.params.subscribe((params: Params) => {
      this.server = this.serversService.getServer(+params['id']);
    }); */

    //this.server = this.route.snapshot.data['server'];
    this.route.data.subscribe((data) => {
      this.server = data['server'];
    });
    //this.route.snapshot.data['server'].then((server) => { server;});


  }

  onEdit() {
    //this.router.navigate(['servers', this.server.id, 'edit']);
    this.router.navigate(['edit'], { relativeTo: this.route, queryParamsHandling: 'preserve' });
  }
}
