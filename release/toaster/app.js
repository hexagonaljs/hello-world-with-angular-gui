var App;

App = (function() {

  function App() {
    var angularGUI, glue, useCase;
    useCase = new UseCase();
    angularGUI = new AngularGUI();
    glue = new Glue(useCase, angularGUI);
    useCase.start();
    window.useCase = useCase;
  }

  return App;

})();

new App();
