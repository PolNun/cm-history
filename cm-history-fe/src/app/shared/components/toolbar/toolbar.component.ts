import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Owner} from "../../../github/interfaces/owner.interface";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  @Input() owner!: Owner;
  @Output() refresh = new EventEmitter<void>();

  onRefreshClick(): void {
    this.refresh.emit();
  }
}
