(function () {
  'use strict';

  // Setting up route
  angular
    .module('users.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    // Users state routing
    $stateProvider
    //leany addition
    .state('qResult', {
      url: '/qResult',
      templateUrl: '/modules/core/client/views/result.client.view.html',
      controller: 'resultController',
      controllerAs: 'vm',
      data: {
        pageTitle: 'qResults'
      },
      params: {
        'drinkArray': []
      }
    })

    .state('quiz', {
      url: '/quiz',
      templateUrl: '/modules/core/client/views/quiz.client.view.html',
      controller: 'quiController',
      controllerAs: 'vm',
      data: {
        pageTitle: 'quiz'
        // css:'/modules/core/client/css/modern-business.css'
      }
    })
    
    .state('modal', {
      url: '/modal',
      templateUrl: '/modules/core/client/views/modal.client.view.html',
      controller: 'modalController',
      controllerAs: 'vm',
      data: {
        pageTitle: 'Modal'
      }
    })
    .state('browse', {
      url: '/browse',
      templateUrl: '/modules/core/client/views/browse.client.view.html',
      data: {
        pageTitle: 'Browse'
      }
    })
    .state('searchResult', {
      url: '/searchResult',
      templateUrl: '/modules/core/client/views/searchResult.client.view.html',
      data: {
        pageTitle: 'Results'
      },
      params: {
        'drinkArray': []
      }
    })
    .state('favorite', {
      url: '/favoriteDrinks',
      templateUrl: '/modules/core/client/views/favorite.client.view.html',
      data: {
        pageTitle: 'Favorite Drink'
      }
    })

    
    .state('day', {
      url: '/drinkOfTheDay',
      templateUrl: '/modules/core/client/views/day.client.view.html',
      data: {
        pageTitle: 'Drink of the Day'
      }
    })

    .state('BACunauth', {
      url: '/BAC-unauth',
      templateUrl: '/modules/BAC/client/views/BAC.client.view.unauth.html',
      data: {
        pageTitle: 'BAC Calculator'
      }
    })

    .state('BACauth', {
      url: '/BAC-auth',
      templateUrl: '/modules/BAC/client/views/BAC.client.view.auth.html',
      data: {
        pageTitle: 'BAC Calculator'
      }
    })

    //leany addition
      .state('settings', {
        abstract: true,
        url: '/settings',
        templateUrl: '/modules/users/client/views/settings/settings.client.view.html',
        controller: 'SettingsController',
        controllerAs: 'vm',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('settings.profile', {
        url: '/profile',
        templateUrl: '/modules/users/client/views/settings/edit-profile.client.view.html',
        controller: 'EditProfileController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Settings'
        }
      })
      .state('settings.password', {
        url: '/password',
        templateUrl: '/modules/users/client/views/settings/change-password.client.view.html',
        controller: 'ChangePasswordController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Settings password'
        }
      })
      .state('settings.accounts', {
        url: '/accounts',
        templateUrl: '/modules/users/client/views/settings/manage-social-accounts.client.view.html',
        controller: 'SocialAccountsController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Settings accounts'
        }
      })
      .state('settings.picture', {
        url: '/picture',
        templateUrl: '/modules/users/client/views/settings/change-profile-picture.client.view.html',
        controller: 'ChangeProfilePictureController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Settings picture'
        }
      })
      .state('authentication', {
        abstract: true,
        url: '/authentication',
        templateUrl: '/modules/users/client/views/authentication/authentication.client.view.html',
        controller: 'AuthenticationController',
        controllerAs: 'vm'
      })
      .state('authentication.signup', {
        url: '/signup',
        templateUrl: '/modules/users/client/views/authentication/signup.client.view.html',
        controller: 'AuthenticationController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Signup'
        }
      })
      .state('authentication.signin', {
        url: '/signin?err',
        templateUrl: '/modules/users/client/views/authentication/signin.client.view.html',
        controller: 'AuthenticationController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Signin'
        }
      })
      .state('password', {
        abstract: true,
        url: '/password',
        template: '<ui-view/>'
      })
      .state('password.forgot', {
        url: '/forgot',
        templateUrl: '/modules/users/client/views/password/forgot-password.client.view.html',
        controller: 'PasswordController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Password forgot'
        }
      })
      .state('password.reset', {
        abstract: true,
        url: '/reset',
        template: '<ui-view/>'
      })
      .state('password.reset.invalid', {
        url: '/invalid',
        templateUrl: '/modules/users/client/views/password/reset-password-invalid.client.view.html',
        data: {
          pageTitle: 'Password reset invalid'
        }
      })
      .state('password.reset.success', {
        url: '/success',
        templateUrl: '/modules/users/client/views/password/reset-password-success.client.view.html',
        data: {
          pageTitle: 'Password reset success'
        }
      })
      .state('password.reset.form', {
        url: '/:token',
        templateUrl: '/modules/users/client/views/password/reset-password.client.view.html',
        controller: 'PasswordController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Password reset form'
        }
      });
  }
}());
