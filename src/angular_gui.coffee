class AngularGUI
  constructor: ->
    @visible = false
    @greetVisible = false
    @start()


  start: =>
    window.HelloWorldCtrl = ($scope) =>
      @scope = $scope
      $scope.change = (name) => @confirmNameButtonClicked(name)
      $scope.visible = => @visible
      $scope.greetVisible = => @greetVisible
      $scope.restart = => @restartClicked()

  showAskForName: =>
    @visible = true

  confirmNameButtonClicked: (name) =>

  hideAskForName: =>
    @visible = false

  showGreetMessage: =>
    @greetVisible = true


  hideGreetMessage: =>
    @greetVisible = false
    @scope.name = ""
    

  restartClicked: =>
