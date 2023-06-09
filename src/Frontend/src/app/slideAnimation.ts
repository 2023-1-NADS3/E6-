import { trigger, transition, style, animate, state } from '@angular/animations';

// export const slideAnimation = trigger('slideAnimation', [
//   transition(':enter', [
//     style({ transform: 'translateX(100%)' }),
//     animate('.3s', style({ transform: 'translateX(0)' })),
//   ]),
//   transition(':leave', [
//     animate('.3s', style({ transform: 'translateX(-100%)' })),
//   ]),
// ]);


// export const slideAnimation = trigger('slideAnimation', [
//   transition(':enter', [
//     style({ opacity: 0 }),
//     animate('300ms ease-in', style({ opacity: 1 }))
//   ]),
//   transition(':leave', [
//     style({ opacity: 1 }),
//     animate('300ms ease-out', style({ opacity: 0 }))
//   ])
// ]);


//slidin
export const slideAnimation = trigger('slideAnimation', [
  state('void', style({
    transform: 'translateY(200%)',
    // opacity: 0
  })),
  transition(':enter', [
    animate('300ms ease-out', style({
      transform: 'translateY(0)',
      // opacity: 1
    }))
  ]),
  transition(':leave', [
    animate('300ms ease-in', style({
      // transform: 'translateY(100%)',
      // opacity: 0
    }))
  ])
]);

export const slideAnimationWithLeave = trigger('slideAnimationWithLeave', [
  state('void', style({
    transform: 'translateY(200%)',
    // opacity: 0
  })),
  transition(':enter', [
    animate('200ms ease-out', style({
      transform: 'translateY(0)',
      // opacity: 1
    }))
  ]),
  transition(':leave', [
    animate('100ms ease-in', style({
      transform: 'translateY(100%)',
    }))
  ])
]);

export const fastSlideAnimation = trigger('fastSlideAnimation', [
  state('void', style({
    transform: 'translateY(100%)',
    // opacity: 0
  })),
  transition(':enter', [
    animate('150ms ease-out', style({
      transform: 'translateY(0)',
      // opacity: 1
    }))
  ]),
  transition(':leave', [
    animate('150ms ease-in', style({
      transform: 'translateY(100%)',
      // opacity: 0
    }))
  ])
]);

export const slideToSide = trigger('slideToSide', [
    state('void', style({ transform: 'translateX(100%)' })),
    transition(':enter', [
      animate('0.20s ease-out', style({ transform: 'translateX(0%)' }))
    ]),
    transition(':leave', [
      animate('0.20s ease-out', style({ transform: 'translateX(200%)' }))
    ])
])

export const slideToSideFromRight = trigger('slideToSideFromRight', [
  state('void', style({ transform: 'translateX(-100%)' })),
  transition(':enter', [
    animate('0.20s ease-out', style({ transform: 'translateX(0%)' }))
  ]),
  // transition(':leave', [
  //   animate('0.20s ease-out', style({ transform: 'translateX(100%)' }))
  // ])
])





