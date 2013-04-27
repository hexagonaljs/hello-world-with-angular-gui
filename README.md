hexagonal.js hello world example with angularjs gui.
====================

This is the simplest possible hexagonaljs app that uses AngularJS as the GUI adapter
It shows all the basic concepts of a hexagonaljs architecture.


How to run it?
--------------

Just clone the repo and open index.html.

How to work on it?
------------------

  $ npm install -g coffee-toaster
  
  $ toaster -dw


The app object
--------------

This is the starting point of the application. The app object initializes the use case object and the adapters. At the end it passes all of them to the glue code. Often it's also starting the useCase object.

```coffeescript
#<< utils
#<< local_storage
#<< use_case
#<< angular_gui
#<< glue

class App
  constructor: ->
    useCase      = new UseCase()
    gui          = new AngularGui()
    glue         = new Glue(useCase, gui)
    
    useCase.start()

new App()
```

The use case object
-------------------

At the heart of an application lives the use case object. Let's look at the use case in this project:

```coffeescript
class UseCase
  constructor: ->
    
  start: =>
    @askForName()

  askForName: =>

  nameProvided: (name) =>
    @greetUser(name)

  greetUser: (name) =>

  restart: =>
    @askForName()
```

The goal of the use case is to show the most important domain actions the user (or other actors) can make. It should be possible to see what kind of interaction happens in the use case. There should be nothing about GUI here. There should be nothing about the persistence (AJAX/API calls) here.

The gui object
--------------

The idea of hexagonal architecture is based on the idea of adapters that are plugged into the domain. One of typical adapters is the gui object. It's responsible for reacting to useCase actions and for letting the user interact with the app. The gui itself shouldn't have any logic. Often, it's just a proxy between the user and the app.


In this example, we've used AngularJS capabilities for creating and managing the GUI.

The glue object
---------------

The use case and gui objects don't know each other. It's great for reducing coupling and better testability. At some point, though, you need to run them together. We call it a glue object. It's responsible for merging the useCase and gui objects. In larger apps, it's also used for merging other adapters, like ServerSideAdapter, LocalStorageAdapter, PusherAdapter, SoundAdapter, etc.

```coffeescript
class Glue
  constructor: (@useCase, @gui, @storage)->
    After(@useCase, "askForName", => @gui.showAskForName())
    After(@useCase, "nameProvided", => @gui.hideAskForName())
    After(@useCase, "greetUser", (name) => @gui.showGreetMessage(name))
    After(@useCase, "restart", => @gui.hideGreetMessage())
    
    After(@gui, "restartClicked", => @useCase.restart())
    After(@gui, "confirmNameButtonClicked", (name) => @useCase.nameProvided(name))
```

You can find the definition of the After method in the utils.coffee file. It's basically wrapping one function with another. If you look at:

```coffeescript
After(@useCase, "askForName", => @gui.showAskForName())
```

What it does, is replacing the original @useCase.askForName method with something like:

```coffeescript
askForName: =>
  # original code
  => @gui.showAskForName()
```

The use case and gui are merged runtime. The merge rules are defines in the glue code.
