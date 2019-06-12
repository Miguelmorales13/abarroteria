import { Component, OnInit, Input } from '@angular/core';
import { Provider } from '@models/provider';

@Component({
  selector: 'app-details-provider',
  templateUrl: './details-provider.component.html',
  styleUrls: ['./details-provider.component.css']
})
export class DetailsProviderComponent implements OnInit {
  @Input("provider") provider: Provider = new Provider();
  constructor() { }

  ngOnInit() {
  }
  goMaps(link): string{
    return link.replace(/ /g, "+");
  }

}
