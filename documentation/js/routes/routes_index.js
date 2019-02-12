var ROUTES_INDEX = {"name":"<root>","kind":"module","className":"AppModule","children":[{"name":"routes","filename":"src/app/app-routing.module.ts","module":"AppRoutingModule","children":[{"path":"portal","component":"PortalComponent","children":[{"path":"mail","component":"MailComponent"},{"path":"events","component":"BlankComponent","children":[{"path":"view","component":"EventsComponent","canActivate":["StudentGuardService"]},{"path":"new","component":"NewEventComponent","canActivate":["StaffGuardService"]},{"path":"edit","component":"EditEventComponent","canActivate":["StaffGuardService"]},{"path":"","redirectTo":"view","pathMatch":"full"}]},{"path":"profile","component":"ProfileComponent","canActivate":["StudentGuardService"]},{"path":"mc","component":"BlankComponent","children":[{"path":"submit","component":"MCSubmissionComponent","canActivate":["StudentGuardService"]}]},{"path":"leaderboard","component":"LeaderboardComponent","canActivate":["StudentGuardService"]},{"path":"","redirectTo":"events","pathMatch":"full"},{"path":"rewards","component":"BlankComponent","children":[{"path":"cart","component":"RewardCartComponent","canActivate":["StudentGuardService"]},{"path":"view","component":"RewardsComponent","canActivate":["StudentGuardService"]},{"path":"new","component":"NewRewardComponent","canActivate":["StaffGuardService"]},{"path":"edit","component":"EditRewardComponent","canActivate":["StaffGuardService"]},{"path":"","redirectTo":"view","pathMatch":"full"}]}]},{"path":"login","component":"LoginComponent","canActivate":["LoginGuardService"]},{"path":"identity","component":"IdentityComponent"},{"path":"","redirectTo":"/login","pathMatch":"full"},{"path":"**","component":"ErrorComponent"}],"kind":"module"}]}
