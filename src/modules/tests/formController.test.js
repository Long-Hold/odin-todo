import { createFormController } from "../formController";

describe('createFormController', () => {
    let formController;
    beforeEach(() => {
        document.body.innerHTML = `
            <section>
                <dialog closedby="any" open>
                    <form id="new-todo-form" method="post">
                        <fieldset>
                            <legend><strong>Task Info</strong></legend>
                            <div>
                                <label for="title">Title*:
                                    <input 
                                    type="text" 
                                    name="title" 
                                    id="title" 
                                    maxlength="64" 
                                    required>
                                </label>
                            </div>

                            <div>
                                <label for="priority">Priority*:
                                    <select name="priority" id="priority">
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                    </select>
                                </label>
                            </div>

                            <div>
                                <!-- Other options will be populated via javascript -->
                                <label for="projects">Project (Optional):
                                    <select name="projects" id="project">
                                        <option value="" selected>None</option>
                                    </select>
                                </label>
                            </div>

                            <div>
                                <label for="deadline">Deadline (Optional): 
                                    <input 
                                    type="date" 
                                    name="deadline"
                                    id="deadline">
                                </label>
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend><strong>Additional Notes</strong></legend>
                            <div>
                                <label for="description">Descritpion (Optional):
                                    <textarea 
                                    name="description" 
                                    id="description"
                                    rows="10"
                                    cols="30">
                                    </textarea>
                                </label>
                            </div>

                            <div id="checklist-container">
                                <!-- User can add checkboxes with a brief desc -->
                                <!-- Eachtime they click the button -->
                                <span>Checklist (Optional):</span>

                                <!-- Dynamically populate with input fields representing checklist steps -->
                                <section></section>
                                <button type="button" id="add-step">Add Step</button>
                            </div>
                        </fieldset>

                        <section id="form-control-btns">
                            <button type="submit">Submit</button>
                            <button type="reset" data-action="reset">Reset</button>
                            <button type="button" data-action="cancel">Cancel</button>
                        </section>
                    </form>
                </dialog>
            </section>
        `;
    });
})