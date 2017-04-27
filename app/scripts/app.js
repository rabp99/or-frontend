'use strict';

/**
 * @ngdoc overview
 * @name tuplastFrontendApp
 * @description
 * # tuplastFrontendApp
 *
 * Main module of the application.
 */
angular
.module('tuplastFrontendApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'angular-scroll-animate',
    'ui.router',
    'bootstrapHoverAnimationDropdown',
    'thatisuday.ng-image-gallery',
    'angularValidator',
    'ngProgress'
])
.config(function($stateProvider, $urlRouterProvider, ngImageGalleryOptsProvider) {
    var mainState = {
        name: 'main',
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
        title: 'Home'
    };

    var quienesSomosState = {
        name: 'quienesSomos',
        url: '/quienes-somos',
        templateUrl: 'views/quienes-somos.html',
        controller: 'QuienesSomosCtrl',
        controllerAs: 'quienesSomos',
        title: '¿Quiènes somos?'
    };
    
    var politicasState = {
        name: 'politicas',
        url: '/politicas',
        templateUrl: 'views/politicas.html',
        controller: 'PoliticasCtrl',
        controllerAs: 'politicas',
        title: 'Políticas'
    };

    var productosState = {
        name: 'productos',
        url: '/productos',
        templateUrl: 'views/productos.html',
        controller: 'ProductosCtrl',
        controllerAs: 'productos',
        title: 'Productos'
    };
    
    var productosDetailState = {
        name: 'productos.detail',
        url: '/{id}',
        templateUrl: 'views/productos-detail.html',
        controller: 'ProductosDetailCtrl',
        controllerAs: 'productosDetail',
        params: {
            id: {
                value: '1'
            }
        }
    };
    
    var clientesState = {
        name: 'clientes',
        url: '/clientes',
        templateUrl: 'views/clientes.html',
        controller: 'ClientesCtrl',
        controllerAs: 'clientes',
        title: 'Clientes'
    };
    
    var obrasState = {
        name: 'obras',
        url: '/obras',
        templateUrl: 'views/obras.html',
        controller: 'ObrasCtrl',
        controllerAs: 'obras',
        title: 'Obras'
    };
    
    var obrasDetailState = {
        name: 'obras-detail',
        url: '/obras/{id}',
        templateUrl: 'views/obras-detail.html',
        controller: 'ObrasDetailCtrl',
        controllerAs: 'obrasDetail',
        params: {
            id: {
                value: '1'
            }
        }
    };
    
    var pagesState = {
        name: 'pages',
        url: '/pages/{id}',
        templateUrl: 'views/pages.html',
        controller: 'PagesCtrl',
        controllerAs: 'pages',
        params: {
            id: {
                value: '1'
            }
        }
    };
    
    var bolsaTrabajoState = {
        name: 'bolsaTrabajo',
        url: '/bolsa-trabajo',
        templateUrl: 'views/bolsa-trabajo.html',
        controller: 'BolsaTrabajoCtrl',
        controllerAs: 'bolsaTrabajo',
        title: 'Bolsa de Trabajo'
    };
    
    var sugerenciasState = {
        name: 'sugerencias',
        url: '/sugerencias',
        templateUrl: 'views/sugerencias.html',
        controller: 'SugerenciasCtrl',
        controllerAs: 'sugerencias',
        title: 'Sugerencias'
    };
    
    $stateProvider.state(mainState);
    $stateProvider.state(quienesSomosState);
    $stateProvider.state(politicasState);
    $stateProvider.state(productosState);
    $stateProvider.state(productosDetailState);
    $stateProvider.state(clientesState);
    $stateProvider.state(obrasState);
    $stateProvider.state(obrasDetailState);
    $stateProvider.state(pagesState);
    $stateProvider.state(bolsaTrabajoState);
    $stateProvider.state(sugerenciasState);
    $urlRouterProvider.when('', '/');
    
    ngImageGalleryOptsProvider.setOpts({
        thumbnails: true,
        inline:   false,
        imgBubbles:   false, 
        bgClose:   true,
        bubbles:   true, 
        imgAnim:   'fadeup',
        thumbSize: 160
    });
})
.run(function($rootScope, $state, $window, ProductosService, InfosService, PagesService) {
    $rootScope.show = true;
    $('#menu-alter').css('display', 'block');
    $('#spnTel').css('display', 'inline');
    $('#spnEml').css('display', 'inline');
    $rootScope.showChat = function() {
        $window.open('#/chat/', '_blank', 'Chat Online');
    };
    
    /*
    $rootScope.layout = {};
    $rootScope.layout.loading = false; 
   
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

        //show loading gif
        $rootScope.layout.loading = true;
    });
    */
   
    $rootScope.$on('$stateChangeSuccess', function(event, toParams, fromState, fromParams) {
        // hide loading gif
        /*
        $rootScope.counter = 0;
        $rootScope.total_counts = 50;
        $interval(function() {
            $rootScope.counter++;
            if($rootScope.counter === $rootScope.total_counts) {
                $rootScope.layout.loading = false;
            }
        }, 10, $rootScope.total_counts);
        */
        // setting title
        $rootScope.title = $state.current.title;
        if ($state.current.name !== 'productos.detail') {
            $window.scrollTo(0, 0);
        }
    });
    
    /*
    $rootScope.$on('$stateChangeCancel', function() {

        //hide loading gif
        $rootScope.layout.loading = false;
    });
    */
  
    $rootScope.refresh = function() {
        $state.reload();
    };
    
    ProductosService.getPages(function(data) {
        $rootScope.producto_pages = data.producto_pages;
    });
    
    ProductosService.getLineasProductos(function(data) {
        $rootScope.productos = data.productos;
    });
    
    PagesService.get(function(data) {
       $rootScope.pages = data.pages;
    });
    
    $rootScope.path_location = 'http://localhost:8000/or-backend/';
       
    var search = ['facebook_link', 'twitter_link', 'telf_oficina',
        'email_1', 'email_2', 'telf_area_tecnica'
    ];
    $rootScope.infosRoot = {};
    
    InfosService.getDataMany(search, function(data) {
        angular.forEach(search, function(value, key) {
            $rootScope.infosRoot[value] = data.info[value];
        });
    });
    
    $rootScope.showMenu = function($el) {
        $rootScope.$apply(function() {
            $rootScope.show = true;
            $('#imgLogo').removeClass('reduce');
            $('#imgLogo').addClass('enlarge');
            
            $('#dvNavTop').removeClass('reduce-top');
            $('#dvNavTop').addClass('enlarge-top');
        })
    };
    
    $rootScope.hideMenu = function($el) {
        $rootScope.$apply(function() {
            $rootScope.show = false;
            $('#imgLogo').removeClass('enlarge');
            $('#imgLogo').addClass('reduce');
            
            $('#dvNavTop').removeClass('enlarge-top');
            $('#dvNavTop').addClass('reduce-top');
        })
    };
})
.path_location = 'http://localhost:8000/or-backend/';