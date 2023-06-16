export const GENDERS  =  ["Male", "Female","Trans Male","Trans Female","Agender","Bigender","Other"];

export const validateId = (id) => { 
    if (!id) {
       return { error: "Id is required" };
    }

    if (isNaN(id) || id % 1 !== 0) {
        return { error: "Id must be an integer" };
    }

    if (id <= 1) {
        return { error: "Id must be a number greater than 1" };
    }
}

export const validateEmail = (email) => {
    if(!email){
        return { error: "Email is required" };
    }
    if (!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
        return { error: "Email is not valid" };
    }
}

export const validatePassword = (password) => {
    if(!password){
        return { error: "Password is required" };
    }
    if (!password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
        return { error:"Password must be at least 8 characters long and contain at least one letter and one number."};
      }
}

export const validateHashedPassword = (password) => {
    if(!password){
        return { error: "Password is required" };
    }
}


export const validateName = (name) => {
    if(!name){
        return { error: "Name is required" };
    }

    if(name.match(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/)){
        return { error: "Name is not valid" };
    }

}

export const validateDate = (date) => {
    if(!date){
        return { error: "Birth date is required" };
    }
}

export const validateGender = (gender) => {
    if(!gender) {
        return {error: "Gender is required"}
    }

    if(typeof gender !== 'string') {
        return {error:"gender format is not valid"}
    }

   if(!GENDERS.includes(gender)) {
        return {error: "Gender is not in : Male, Female,Trans Male,Trans Female,Agender, Bigender, Other"}
    }
}

export const validateHeight = (height) => {
    if(!height){
        return { error: "Height is required" };
    }

    if(typeof height !== 'string'){
        return { error: "Height format is not valid" };
    }

    if(height.match(/^[0-9]{3}.[0-9]{2}$/)){
        return { error: "Invalid Height. Correct height example: 185.00"};
    } 
}

export const validateWeight = (weight) => {
    if(!weight){
        return { error: "Weight is required" };
    }

    if(typeof weight !== 'string'){
        return { error: "Weight format is not valid" };
    }

    if(weight.match(/^[0-9]{3}.[0-9]{2}$/)){
        return { error: "Weight is not valid. Correct weights are 185.00 and  90.00" };
    }
}

export const validateDescription = (description) => {
    if(!description){
        return { error: "Description is required" };
    }
    if(typeof description !== 'string'){
        return { error: "Description format is not valid" };
    }
    if(description.length > 200){
        return { error: "Description must be under 200 characters" };
    }
}

export const validateNotes = (trainer_notes) => {
    if(!trainer_notes){
        return { error: "Trainer notes is required" };
    }
    if(typeof trainer_notes !== 'string'){
        return { error: "Trainer notes format is not valid" };
    }
    if(trainer_notes.length > 350){
        return { error: "Trainer notes must be under 350 characters" };
    }
}

export const validateNumber = (number) => {
    if(!number){
        return { error: "Number is required" };
    }
    if (isNaN(id) || id % 1 !== 0) {
        return { error: "Id must be an integer" };
    }
    if(number < 0){
        return { error: "Number must be greater than 0" };
    }
}

export const validateRpe = (rpe) => {
    if(!rpe){
        return { error: "Rpe is required" };
    }
    if (isNaN(id) || id % 1 !== 0) {
        return { error: "Id must be an integer" };
    }
    if(rpe < 0 && rpe > 10){
        return { error: "rpe must be an integer from 1 to 10" };
    }
}

export const validateTrainer = (trainer) => {
    //validate name using validateName
    const nameError = validateName(trainer.name);
    if(nameError) return nameError;

    //validate mail usiing validateEmail
    const emailError = validateEmail(trainer.email);
    if(emailError) return emailError;

    //validate password using validatePassword
    const passwordError = validatePassword(trainer.password);
    if(passwordError) return passwordError;

    //validate birth_date using validateDate
    const dateError = validateDate(trainer.birth_date);
    if(dateError) return dateError;

    //validate gender using validateGender
    const genderError = validateGender(trainer.gender);
    if(genderError) return genderError;
}

export const validateAthlete = (athlete) => {
    const nameError = validateName(athlete.name);
    if(nameError) return nameError;

    const emailError = validateEmail(athlete.email);
    if(emailError) return emailError;

    const passwordError = validatePassword(athlete.password);
    if(passwordError) return passwordError;

    const dateError = validateDate(athlete.birth_date);
    if(dateError) return dateError;

    const genderError = validateGender(athlete.gender);
    if(genderError) return genderError;

    const heightError = validateHeight(athlete.height);
    if(heightError) return heightError;

    const weightError = validateWeight(athlete.weight);
    if(weightError) return weightError;

    const trainerIdError = validateId(athlete.trainer_id);
    if(trainerIdError) return trainerIdError;

    const dietitianIdError = validateId(athlete.dietitian_id);
    if(dietitianIdError) return dietitianIdError;
}

// validate routine with the following fields: name, description, trainer_id, athlete_id
export const validateRoutine = (routine) => {
    const nameError = validateName(routine.name);
    if(nameError) return nameError;

    const descriptionError = validateDescription(routine.description);
    if(descriptionError) return descriptionError;

    const trainerIdError = validateId(routine.trainer_id);
    if(trainerIdError) return trainerIdError;

    const athleteIdError = validateId(routine.athlete_id);
    if(athleteIdError) return athleteIdError;
}

// validate session with the following fields: name, description, session_date, trainer_notes, routine_id
export const validateSession = (session) => {
    const nameError = validateName(session.name);
    if(nameError) return nameError;

    const descriptionError = validateDescription(session.description);
    if(descriptionError) return descriptionError;

    const dateError = validateDate(session.session_date);
    if(dateError) return dateError;

    const trainerNotesError = validateNotes(session.trainer_notes);
    if(trainerNotesError) return trainerNotesError;

    const routineIdError = validateId(session.routine_id);
    if(routineIdError) return routineIdError;
}

// validate exercise with the following fields: name, description, muscle_group, trainer_id
export const validateExercise = (exercise) => {
    const nameError = validateName(exercise.name);
    if(nameError) return nameError;

    const descriptionError = validateDescription(exercise.description);
    if(descriptionError) return descriptionError;

    const muscleGroupError = validateName(exercise.muscle_group);
    if(muscleGroupError) return muscleGroupError;

    const trainerIdError = validateId(exercise.trainer_id);
    if(trainerIdError) return trainerIdError;
}

//validate execution with the following parameters: num_set,repetitions, weight, rpe, rir, done, training_session_id, exercise_id
export const validateExecution = (execution) => {
    const numSetError = validateNumber(execution.num_set);
    if(numSetError) return numSetError;

    const repetitionsError = validateNumber(execution.repetitions);
    if(repetitionsError) return repetitionsError;

    const weightError = validateWeight(execution.weight);
    if(weightError) return weightError;

    const rpeError = validateRpe(execution.rpe);
    if(rpeError) return rpeError;

    const rirError = validateRpe(execution.rir);
    if(rirError) return rirError;

    const trainingSessionIdError = validateId(execution.training_session_id);
    if(trainingSessionIdError) return trainingSessionIdError;

    const exerciseIdError = validateId(execution.exercise_id);
    if(exerciseIdError) return exerciseIdError;

    if(execution.done !== 0 && execution.done !== 1){
        return { error: "Done must be 0 or 1" };
    }
}

//validdate meal with the following parameters: name, description, recipe, calories, protein, carbohydrates, fat, dietitian_id
export const validateMeal = (meal) => {
    const nameError = validateName(meal.name);
    if(nameError) return nameError;

    const descriptionError = validateDescription(meal.description);
    if(descriptionError) return descriptionError;

    const recipeError = validateNotes(meal.recipe);
    if(recipeError) return recipeError;

    const caloriesError = validateNumber(meal.calories);
    if(caloriesError) return caloriesError;

    const proteinError = validateNumber(meal.protein);
    if(proteinError) return proteinError;

    const carbohydratesError = validateNumber(meal.carbohydrates);
    if(carbohydratesError) return carbohydratesError;

    const fatError = validateNumber(meal.fat);
    if(fatError) return fatError;

    const dietitianIdError = validateId(meal.dietitian_id);
    if(dietitianIdError) return dietitianIdError;
}

// validate trainerLogin with the following parameters: email, hashed_password
export const validateTrainerLogin = (trainerLogin) => {
    const emailError = validateEmail(trainerLogin.email);
    if(emailError) return emailError;

    const passwordError = validatePassword(trainerLogin.password);
    if(passwordError) return passwordError;
}















