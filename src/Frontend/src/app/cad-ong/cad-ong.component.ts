import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { slideAnimation, slideToSide, fastSlideAnimation, slideToSideFromRight } from '../slideAnimation';

@Component({
  selector: 'app-cad-ong',
  templateUrl: './cad-ong.component.html',
  styleUrls: ['./cad-ong.component.css'],
  animations: [slideAnimation, slideToSide, fastSlideAnimation, slideToSideFromRight]
})
export class CadONGComponent {




  constructor(private router: Router, private authService: AuthService) { }

  
  public email: string = ''
  public valid_email: boolean = false
  @ViewChild('emailInput') emailInput!: ElementRef;
  @ViewChild('emailContainer') emailContainer!: ElementRef;

  public name: string = ''
  public valid_name: boolean = false
  @ViewChild('nameInput') nameInput!: ElementRef;
  @ViewChild('nameContainer') nameContainer!: ElementRef;
  
  public description: string = ''
  public valid_description: boolean = false
  @ViewChild('descriptionInput') descriptionInput!: ElementRef;

  public password: string = ''
  public valid_password: boolean = false
  @ViewChild('passwordInput') passwordInput!: ElementRef;
  @ViewChild('passwordContainer') passwordContainer!: ElementRef;

  public confirmPassword: string = ''
  public valid_confirm_password: boolean = false
  @ViewChild('confirmPasswordInput') confirmPasswordInput!: ElementRef;
  @ViewChild('confirmPasswordContainer') confirmPasswordContainer!: ElementRef;

  public address: string = ''
  public valid_address: boolean = false
  @ViewChild('addressInput') addressInput!: ElementRef;
  @ViewChild('addressContainer') addressContainer!: ElementRef;

  public address_state: string = ''

  public addressNumber: string = ''
  public valid_address_number: boolean = false
  @ViewChild('addressNumberInput') addressNumberInput!: ElementRef;
  @ViewChild('addressNumberContainer') addressNumberContainer!: ElementRef;
  
  @ViewChild('weekdayInput') weekdayInput!: ElementRef;

  @ViewChild('registerButton') registerButton!: ElementRef;

  public state: string = 'login'
  public first_time: boolean = true;

  public weekdays: any[] = [
    { day: 'dom', active: false },
    { day: 'seg',active: true},
    { day: 'ter',active: false},
    { day: 'qua',active: false},
    { day: 'qui',active: false},
    { day: 'sex',active: false},
    { day: 'sab',active: false},
]
  public weekdaysclose: any[] = [
    { day: 'dom',  },
    { day: 'seg',},
    { day: 'ter',},
    { day: 'qua',},
    { day: 'qui',},
    { day: 'sex',},
    { day: 'sab',},
]

  changeDay(i: number) {
    let s = 0;
    if (this.weekdays[i].active) {  //disativating
      this.weekdays.forEach(item => {
        if (item.active) s++
      })
      if (s == 1) return
    }
    this.weekdays[i].active = !this.weekdays[i].active;
  }
  
  public dom: boolean = false;
  public seg: boolean = true;
  public ter: boolean = false;
  public qua: boolean = false;
  public qui: boolean = false;
  public sex: boolean = false;
  public sab: boolean = false;


  onDescriptionInputChange() {
    if (this.description.length >= 85 && this.description.length < 400) {
      this.valid_description = true;
      this.descriptionInput.nativeElement.style.border = '2px solid var(--zw-red)'
    } else {
      this.descriptionInput.nativeElement.style.border = '1px solid #b4b4b4'
    }
  }

  onNameInputChange() {
    
    
  }
  onPasswordInputChange(){}
  onConfirmPasswordInputChange(){}
  onAddressInputChange(){}
  onAddressNumberInputChange() { }
  
  onWeekDayInputChange(value: string, i: number) {
    if (value?.length == 2) {
      this.weekdays[i].inputData = `${value}:`;
    }
  }

  onWeekDayInputEndingChange(value: string, i: number) {
    if (value?.length == 2) {
      this.weekdaysclose[i].inputData = `${value}:`;
    }
  }
  
  onEmailInputChange() {
    if (this.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const valid = emailRegex.test(this.email)
      // Update UI based on email validity
      if (valid) {
        this.valid_email = true
        this.emailContainer.nativeElement.style.border = '2px solid var(--zw-red)'
        // Valid email
        // Perform UI updates or other actions
      } else {
        this.valid_email = false
        this.emailContainer.nativeElement.style.border = '1px solid #b4b4b4'
        // Invalid email
        // Perform UI updates or other actions
      }
    } else {
      this.valid_email = false
      this.emailContainer.nativeElement.style.border = '1px solid #b4b4b4'
      // Empty email
      // Perform UI updates or other actions
    }
  }


  public loading: boolean = false;
  showLoading() {
    this.loading = true
    this.registerButton.nativeElement.disabled = true
  }

  hideLoading() {
    this.loading = false
    this.registerButton.nativeElement.disabled = false
  }
  
  async register() {
    this.showLoading()
    const user: any = {
      name: this.name,
      email: this.email,
      description: this.description,
      password: this.password,
      confirm_password: this.confirmPassword,
      address: this.address,
      address_number: this.addressNumber,
      address_state: this.address_state,
    }

    let weeks: any = {}
    this.weekdays.forEach((item, i) => {
      if (item.active) {
        weeks[item.day] = `${this.weekdays[i].inputData}-${this.weekdaysclose[i].inputData}`
      } else {
        weeks[item.day] = '00:00-00:00'
      }
    })
    user.working_time = {...weeks} 
    
   
    setTimeout(async () => {
      const res = await fetch(`http://localhost:3000/account/register/ONG`, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(user)
      });
      if (res.status === 200) {
        const data = await res.text();
        console.log('ok')
        console.log(data)
        this.router.navigateByUrl(`/mail/${this.email}`)
        // localStorage.setItem('user-info', JSON.stringify({ type: data.type, name: data.name }))
        // this.router.navigate(['/perfil'])
        
      } else {
        console.log(await res.text());
      }
      this.hideLoading()
    }, 1500);
  }

  async oauth(){
    const res = await fetch(`http://localhost:3000/oauth`, {
      credentials: 'include',
      method: 'GET',
    });
  }
  



}
