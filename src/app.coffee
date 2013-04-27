#<< utils
#<< local_storage
#<< use_case
#<< angular_gui
#<< glue

class App
  constructor: ->
    useCase      = new UseCase()
    angularGUI   = new AngularGUI()
    glue         = new Glue(useCase, angularGUI)
    useCase.start()
    window.useCase = useCase

new App()

