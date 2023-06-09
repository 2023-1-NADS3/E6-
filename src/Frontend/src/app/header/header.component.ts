import { Component, Input, ViewChild, ElementRef  } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @ViewChild('sidebar') sidebar!: ElementRef;
  
  constructor(private router: Router) { }
  
  public is_sidebar_open: number = 0;

  @Input() logoutButton: boolean = false;
  @Input() sidebarButton: boolean = false;
  @Input() color: boolean = false;
  @Input() back: string = '';





  openSidebar() {
    this.sidebar.nativeElement.style.left = '0'
    this.is_sidebar_open = 1
  }
  closeSidebar() {
    this.sidebar.nativeElement.style.left = '-90vw'
    this.is_sidebar_open = 0
  }
  toggleSidebar() {
    if (this.is_sidebar_open === 0) return this.openSidebar()
    this.closeSidebar()
  }


  goBack(){
    this.router.navigateByUrl(`/${this.back}`)
  }
}
