var AngularGUI,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

AngularGUI = (function() {

  function AngularGUI() {
    this.restartClicked = __bind(this.restartClicked, this);

    this.hideGreetMessage = __bind(this.hideGreetMessage, this);

    this.showGreetMessage = __bind(this.showGreetMessage, this);

    this.hideAskForName = __bind(this.hideAskForName, this);

    this.confirmNameButtonClicked = __bind(this.confirmNameButtonClicked, this);

    this.showAskForName = __bind(this.showAskForName, this);

    this.start = __bind(this.start, this);
    this.visible = false;
    this.greetVisible = false;
    this.start();
  }

  AngularGUI.prototype.start = function() {
    var _this = this;
    return window.HelloWorldCtrl = function($scope) {
      _this.scope = $scope;
      $scope.change = function(name) {
        return _this.confirmNameButtonClicked(name);
      };
      $scope.visible = function() {
        return _this.visible;
      };
      $scope.greetVisible = function() {
        return _this.greetVisible;
      };
      return $scope.restart = function() {
        return _this.restartClicked();
      };
    };
  };

  AngularGUI.prototype.showAskForName = function() {
    return this.visible = true;
  };

  AngularGUI.prototype.confirmNameButtonClicked = function(name) {};

  AngularGUI.prototype.hideAskForName = function() {
    return this.visible = false;
  };

  AngularGUI.prototype.showGreetMessage = function() {
    return this.greetVisible = true;
  };

  AngularGUI.prototype.hideGreetMessage = function() {
    this.greetVisible = false;
    return this.scope.name = "";
  };

  AngularGUI.prototype.restartClicked = function() {};

  return AngularGUI;

})();
