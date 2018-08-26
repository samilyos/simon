angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    

      .state('tabsController.cryptoCurrency', {
    url: '/page2',
    views: {
      'tab1': {
        templateUrl: 'templates/cryptoCurrency.html',
        controller: 'cryptoCurrencyCtrl'
      }
    }
  })

  .state('tabsController.iQOptions', {
    url: '/page3',
    views: {
      'tab2': {
        templateUrl: 'templates/iQOptions.html',
        controller: 'iQOptionsCtrl'
      }
    }
  })

  .state('tabsController.fOREX', {
    url: '/page4',
    views: {
      'tab3': {
        templateUrl: 'templates/fOREX.html',
        controller: 'fOREXCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('tabsController.send', {
    url: '/page5',
    views: {
      'tab4': {
        templateUrl: 'templates/send.html',
        controller: 'sendCtrl'
      }
    }
  })

  .state('tabsController.about', {
    url: '/page6',
    views: {
      'tab5': {
        templateUrl: 'templates/about.html',
        controller: 'aboutCtrl'
      }
    }
  })

  .state('tabsController.thankYou', {
    url: '/page7',
    views: {
      'tab4': {
        templateUrl: 'templates/thankYou.html',
        controller: 'thankYouCtrl'
      }
    }
  })

.state('forexNews', {
    url: '/page8',
    templateUrl: 'templates/forexNews.html',
    controller: 'forexNewsCtrl'
  })

.state('forexEventsCalendar', {
    url: '/page9',
    templateUrl: 'templates/forexEventsCalendar.html',
    controller: 'forexEventsCalendarCtrl'
  })

.state('forexCharts', {
    url: '/page10',
    templateUrl: 'templates/forexCharts.html',
    controller: 'forexChartsCtrl'
  })

.state('forexTechAnalysis', {
    url: '/page11',
    templateUrl: 'templates/forexTechAnalysis.html',
    controller: 'forexTechAnalysisCtrl'
  })

.state('cryptoNews', {
    url: '/page12',
    templateUrl: 'templates/cryptoNews.html',
    controller: 'cryptoNewsCtrl'
  })

.state('cryptoEventsCalendar', {
    url: '/page13',
    templateUrl: 'templates/cryptoEventsCalendar.html',
    controller: 'cryptoEventsCalendarCtrl'
  })

.state('cryptoCharts', {
    url: '/page14',
    templateUrl: 'templates/cryptoCharts.html',
    controller: 'cryptoChartsCtrl'
  })

.state('cryptoTechAnalysis', {
    url: '/page15',
    templateUrl: 'templates/cryptoTechAnalysis.html',
    controller: 'cryptoTechAnalysisCtrl'
  })

$urlRouterProvider.otherwise('/page1/page4')


});