// imports

import { Component } from './base-component.js';
import { Validatable, validate } from '../util/validation.js';
import { Autobind } from '../decorators/autobind.js';
import { projectState } from '../state/project-state.js';

// ========== Project Input Class ========== //
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  // input elements of form
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super('project-input', 'app', true, 'user-input');
    // input elements accessed inside every object/class created:
    this.titleInputElement = this.element.querySelector(
      '#title'
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      '#description'
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      '#people'
    ) as HTMLInputElement;

    // execute methods below
    this.configure();
  }

  configure() {
    // option without creating an autobind decorator (see Autobind above)
    //this.element.addEventListener('submit', this.submitHandler.bind(this));
    this.element.addEventListener('submit', this.submitHandler);
  }

  renderContent() {}

  // gather user input data, validate and return
  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    // create validatable objects

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true,
    };

    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLenght: 5,
    };

    const peopleValidatable: Validatable = {
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 5,
    };

    //validation:
    if (
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(peopleValidatable)
    ) {
      alert('Invalid input, please try again!');
      return;
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }

  // clear input after submit (form cleared)
  private clearInputs() {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.peopleInputElement.value = '';
  }

  @Autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    // check at runtime if userInput is Tuple (compiled to Array in Javascript)
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      //console.log(title, desc, people);
      projectState.addProject(title, desc, people);
      this.clearInputs();
    }
  }
}
