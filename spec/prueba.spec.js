const ToDoList = require("../src/index.mjs");

decribe("Clase ToDoList", () =>{
  it ("Debe ser uan clase", ()=>{
    expect(typeof ToDoList.prototype.constructor).toBe("function");
  });

  it ("Debe implementar el metodo getTodos()", () =>{
    const list = new ToDoList();
    expect(list.getTodo).toBeDefined();
  });

  it ("Debe implementar el metodo addTodos()", () =>{
    const list = new ToDoList();
    expect(list.addTodo).toBeDefined();
  });

  it ("Debe implementar el metodo deleteTodos()", () =>{
    const list = new ToDoList();
    expect(list.deleteTodo).toBeDefined();
  });

  it ("El metodo getTodos() debe retornar un array", () => {
    const list = new ToDoList();
    expect(Array.isArray(list.getTodo())).toBeTrue();
  });

  it ("El metodo getTodos() debe retornar un array", () =>{
    const list = new ToDoList();
    list.addTodo("Hacer la HW de la clase de hoy");
    expect(list.getTodo()).toEqual(["Hacer la HW de la clase de hoy"]);
  });

  it ("El metodo deleteToDo() debe eliminar la ultima tarea", ()=> {
    const list = new toDoList();
    list.addTodo("A");
    list.addTodo("B");
    list.addTodo("C");
    list.deleteTodo();
    expect(list.getTodos()).toContain("A");
    expect(list.getTodos()).toContain("B");
    expect(list.getTodos()).not.toContain("C");
  });
});

/*prueba*/