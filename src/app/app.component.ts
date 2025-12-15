import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  menuItems = [
    { label: 'Dashboard', icon: 'pi pi-home', route: '/dashboard' },
    { label: 'Item Master', icon: 'pi pi-list', route: '/item' },
    { label: 'Unit Master', icon: 'pi pi-tags', route: '/unit' },
    { label: 'Billing', icon: 'pi pi-shopping-cart', route: '/billing' },
    { label: 'Transactions', icon: 'pi pi-wallet', route: '/transactions' }
  ];

  title = 'wonder-bakery';
  currentRoute = '';


  navigate(path: string) {
    this.router.navigate([path]);
  }


  showLayout = true;
  private sub?: Subscription;

  // routes where we DON'T want the main layout
  private smallLayoutRoutes = ['/login', '/register', '/auth/login', '/auth/register'];


  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }

  ngOnInit(): void {
    // check initial URL
    this.updateLayoutVisibility(this.router.url);

    // update on every navigation end
    this.sub = this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateLayoutVisibility(event.urlAfterRedirects);
      });
  }

  private updateLayoutVisibility(url: string) {
    // If you use matrix params or query params, strip them if needed:
    const path = url.split('?')[0].split(';')[0];

    // hide layout when path exactly matches one of smallLayoutRoutes
    this.showLayout = !this.smallLayoutRoutes.includes(path);

    // If you want to hide layout for any route that starts with '/auth', use:
    // this.showLayout = !path.startsWith('/auth');

    // Or for more flexible matching, use regex or includes:
    // this.showLayout = !(path === '/login' || path.startsWith('/public'));
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
