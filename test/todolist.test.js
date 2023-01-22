const Todo = require('../lib/todo');
const TodoList = require('../lib/todolist');

describe('TodoList', () => {
  let todo1;
  let todo2;
  let todo3;
  let list;

  beforeEach(() => {
    todo1 = new Todo('Buy milk');
    todo2 = new Todo('Clean room');
    todo3 = new Todo('Go to the gym');

    list = new TodoList("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });

  test('calling size returns the size of the todolist', () => {
    expect(list.size()).toBe(3);
  });

  test('calling toArray returns the list in array form', () => {
    expect(list.toArray()).toEqual([todo1, todo2, todo3]);
  });

  test('calling first returns the first todo item on the list', () => {
    expect(list.first()).toEqual(todo1)
  });

  test('calling last returns the last todo item on the list', () => {
    expect(list.last()).toEqual(todo3);
  });

  test('calling shift removes and returns the first item on the list', () => {
    let todo = list.shift();
    expect(todo).toEqual(todo1);
    expect(list.toArray()).toEqual([todo2, todo3]);
  });

  test('calling pop removes and returns the last item on the list', () => {
    let todo = list.pop();
    expect(todo).toEqual(todo3);
    expect(list.toArray()).toEqual([todo1, todo2]);
  });

  test('calling isDone returns false if not all todos are marked as false', () => {
    expect(list.isDone()).toBe(false);
  });

  test('calling add with an item that is not a Todo object throws an error', () => {
    expect(() => list.add('hello world')).toThrow(TypeError);
    expect(() => list.add(42)).toThrow(TypeError);
  });

  test('calling itemAt returns the item at the given index', () => {
    expect(list.itemAt(0)).toEqual(todo1);
    expect(list.itemAt(1)).toEqual(todo2);
    expect(() => list.itemAt(5)).toThrow(ReferenceError);
  });

  test('calling markDoneAt marks a todo item as done', () => {
    expect(() => list.markDoneAt(4)).toThrow(ReferenceError);

    list.markDoneAt(1);
    
    expect(todo1.isDone()).toBe(false);
    expect(todo2.isDone()).toBe(true);
    expect(todo3.isDone()).toBe(false);
  });

  test('calling markUndoneAt marks a todo item as undone', () => {
    expect(() => list.markUndoneAt(3)).toThrow(ReferenceError); 

    todo1.markDone();
    todo2.markDone();
    todo3.markDone();
    
    list.markUndoneAt(1);
    
    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(false);
    expect(todo3.isDone()).toBe(true);
  });

  test('calling markAllDone marks all todo items as done', () => {
    list.markAllDone();
    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(true);
    expect(todo3.isDone()).toBe(true);
    expect(list.isDone()).toBe(true);
  });

  test('calling removeAt removes and returns the todo item at the given index', () => {
    expect(() => list.removeAt(6)).toThrow(ReferenceError); 
    let removedTodo = list.removeAt(1);

    expect(removedTodo[0]).toEqual(todo2);
    expect(list.toArray()).toEqual([todo1, todo3]);
    
  });

  test('calling toString returns a string representation of the list', () => {
    let string = `---- Today's Todos ----
[ ] Buy milk
[ ] Clean room
[ ] Go to the gym`;

    expect(list.toString()).toBe(string);
  });

  test('calling toString returns different string for a done todo item', () => {
    let string = `---- Today's Todos ----
[X] Buy milk
[ ] Clean room
[ ] Go to the gym`;

    todo1.markDone();

    expect(list.toString()).toBe(string);
  });

  test('calling toString returns a string representing all todo items marked as done', () => {
    let string = `---- Today's Todos ----
[X] Buy milk
[X] Clean room
[X] Go to the gym`;

    list.markAllDone();

    expect(list.toString()).toBe(string);
  });

  test('calling forEach iterates over all todo items', () => {
    let arr = [];
    list.forEach(todo => arr.push(todo));

    expect(arr.length).toEqual(3);
  });

  test('calling filter returns a new list with the filtered items', () => {;
    let newList = new TodoList(list.title);
    todo1.markDone();
    newList.add(todo1);

    expect(newList.title).toBe(list.title);

    let doneItems = list.filter(todo => todo.isDone());
    expect(doneItems.toString()).toBe(newList.toString());
  });
});
