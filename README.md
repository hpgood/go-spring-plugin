# go-spring README

 the plugin is general code for go-spring

 https://github.com/hpgood/go-spring

## Features

auto add setter for sturct which had bean tag .
for example:
```
type Demo struct {
	db      *SQLDataBase   `bean:"mysql_db"`
	otherDb *infra.OtherDb `bean:"other_db"`
	local   int64
}
```

\!\[feature X\]\(images/feature-x.png\)

select the whole struct and press ctrl+shift+p ,to open cmd:
```
go-spring.setter           // auto add setter from struct
go-spring.add-bean-name    // add Name() string for struct
```
select one line of struct variable and press ctrl+shift+p ,to open cmd:
```
go-spring.add-bean-tag     // add tag for the var
go-spring.var-setter       // add tag for var
```
> Tip: Many popular extensions utilize animations. This is an excellent way to show off your extension! We recommend short, focused animations that are easy to follow.

## Requirements

If you have any requirements or dependencies, add a section describing those and how to install and configure them.

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `myExtension.enable`: Enable/disable this extension.
* `myExtension.thing`: Set to `blah` to do something.

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release 
### 1.0.1

Change Name() to BeanName()

### 1.0.2

add common setter 

### 1.0.3

fix bug. focus on one line.

### 1.0.4

fix bug. deal with comment.

### 1.0.5

fix bug.array for common setter

### 1.0.6

fix gen code for common getter
### 1.0.7

gen code with InjectBean(any) bool

### 1.0.8

gen interface from struct.

---

## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.
cmd.exe (不是powershell)
vsce package 
vsce publish

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux).
* Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux).
* Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets.

## For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
