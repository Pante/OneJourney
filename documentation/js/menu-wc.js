'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">one-journey documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                        <li class="link">
                            <a href="dependencies.html" data-type="chapter-link">
                                <span class="icon ion-ios-list"></span>Dependencies
                            </a>
                        </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse" ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-5c7de8ee5621f7e1f9894ecc0485ac0c"' : 'data-target="#xs-components-links-module-AppModule-5c7de8ee5621f7e1f9894ecc0485ac0c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-5c7de8ee5621f7e1f9894ecc0485ac0c"' :
                                            'id="xs-components-links-module-AppModule-5c7de8ee5621f7e1f9894ecc0485ac0c"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BlankComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BlankComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditEventComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditEventComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditRewardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditRewardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ErrorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ErrorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EventCardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EventCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EventsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EventsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LeaderboardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LeaderboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoadingComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoadingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MCSubmissionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MCSubmissionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MailComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MailComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewEventComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NewEventComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewRewardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NewRewardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PaginationButtonsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PaginationButtonsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PortalComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PortalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfileComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProfileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RewardCardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RewardCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RewardCartComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RewardCartComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RewardsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RewardsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StyledToastComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StyledToastComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-AppModule-5c7de8ee5621f7e1f9894ecc0485ac0c"' : 'data-target="#xs-directives-links-module-AppModule-5c7de8ee5621f7e1f9894ecc0485ac0c"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-AppModule-5c7de8ee5621f7e1f9894ecc0485ac0c"' :
                                        'id="xs-directives-links-module-AppModule-5c7de8ee5621f7e1f9894ecc0485ac0c"' }>
                                        <li class="link">
                                            <a href="directives/FutureDateValidatorDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">FutureDateValidatorDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/NumericValidatorDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">NumericValidatorDirective</a>
                                        </li>
                                    </ul>
                                </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-5c7de8ee5621f7e1f9894ecc0485ac0c"' : 'data-target="#xs-injectables-links-module-AppModule-5c7de8ee5621f7e1f9894ecc0485ac0c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-5c7de8ee5621f7e1f9894ecc0485ac0c"' :
                                        'id="xs-injectables-links-module-AppModule-5c7de8ee5621f7e1f9894ecc0485ac0c"' }>
                                        <li class="link">
                                            <a href="injectables/ErrorService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ErrorService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/EventBindingService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>EventBindingService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/EventService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>EventService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LeaderboardService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>LeaderboardService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LoadingService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>LoadingService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MCService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>MCService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MailService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>MailService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ProfileService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ProfileService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RewardBindingService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>RewardBindingService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RewardCartService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>RewardCartService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RewardService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>RewardService</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-AppModule-5c7de8ee5621f7e1f9894ecc0485ac0c"' : 'data-target="#xs-pipes-links-module-AppModule-5c7de8ee5621f7e1f9894ecc0485ac0c"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-AppModule-5c7de8ee5621f7e1f9894ecc0485ac0c"' :
                                            'id="xs-pipes-links-module-AppModule-5c7de8ee5621f7e1f9894ecc0485ac0c"' }>
                                            <li class="link">
                                                <a href="pipes/ShortenPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ShortenPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthenticationModule.html" data-type="entity-link">AuthenticationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AuthenticationModule-39b222c1f0cb97c8713af87672bd4df7"' : 'data-target="#xs-components-links-module-AuthenticationModule-39b222c1f0cb97c8713af87672bd4df7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AuthenticationModule-39b222c1f0cb97c8713af87672bd4df7"' :
                                            'id="xs-components-links-module-AuthenticationModule-39b222c1f0cb97c8713af87672bd4df7"' }>
                                            <li class="link">
                                                <a href="components/IdentityComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">IdentityComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthenticationModule-39b222c1f0cb97c8713af87672bd4df7"' : 'data-target="#xs-injectables-links-module-AuthenticationModule-39b222c1f0cb97c8713af87672bd4df7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthenticationModule-39b222c1f0cb97c8713af87672bd4df7"' :
                                        'id="xs-injectables-links-module-AuthenticationModule-39b222c1f0cb97c8713af87672bd4df7"' }>
                                        <li class="link">
                                            <a href="injectables/AuthenticationService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AuthenticationService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LoginGuardService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>LoginGuardService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/StaffGuardService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>StaffGuardService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/StudentGuardService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>StudentGuardService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AppPage.html" data-type="entity-link">AppPage</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuthenticationComponent.html" data-type="entity-link">AuthenticationComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/Binding.html" data-type="entity-link">Binding</a>
                            </li>
                            <li class="link">
                                <a href="classes/EventFormComponent.html" data-type="entity-link">EventFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/Identity.html" data-type="entity-link">Identity</a>
                            </li>
                            <li class="link">
                                <a href="classes/InvalidRoleError.html" data-type="entity-link">InvalidRoleError</a>
                            </li>
                            <li class="link">
                                <a href="classes/Paginated.html" data-type="entity-link">Paginated</a>
                            </li>
                            <li class="link">
                                <a href="classes/RESTListService.html" data-type="entity-link">RESTListService</a>
                            </li>
                            <li class="link">
                                <a href="classes/RewardFormComponent.html" data-type="entity-link">RewardFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/RoleGuardService.html" data-type="entity-link">RoleGuardService</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthenticationService.html" data-type="entity-link">AuthenticationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ErrorService.html" data-type="entity-link">ErrorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EventBindingService.html" data-type="entity-link">EventBindingService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EventService.html" data-type="entity-link">EventService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LeaderboardService.html" data-type="entity-link">LeaderboardService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoadingService.html" data-type="entity-link">LoadingService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoginGuardService.html" data-type="entity-link">LoginGuardService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MailService.html" data-type="entity-link">MailService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MCService.html" data-type="entity-link">MCService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProfileService.html" data-type="entity-link">ProfileService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RewardBindingService.html" data-type="entity-link">RewardBindingService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RewardCartService.html" data-type="entity-link">RewardCartService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RewardService.html" data-type="entity-link">RewardService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StaffGuardService.html" data-type="entity-link">StaffGuardService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StudentGuardService.html" data-type="entity-link">StudentGuardService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/AuthenticationInterceptor.html" data-type="entity-link">AuthenticationInterceptor</a>
                            </li>
                            <li class="link">
                                <a href="interceptors/RESTInterceptor.html" data-type="entity-link">RESTInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/GuardService.html" data-type="entity-link">GuardService</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AwardType.html" data-type="entity-link">AwardType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Box.html" data-type="entity-link">Box</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Configuration.html" data-type="entity-link">Configuration</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Devices.html" data-type="entity-link">Devices</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/List.html" data-type="entity-link">List</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Message.html" data-type="entity-link">Message</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Screen.html" data-type="entity-link">Screen</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});