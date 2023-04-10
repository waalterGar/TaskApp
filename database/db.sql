DROP table if exists tasks;
DROP table if exists trainer;
DROP table if exists dietitian;
DROP table if exists athlete;
DROP table if exists routine;

CREATE TABLE tasks (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    description VARCHAR(300),
    done BOOLEAN NOT NULL DEFAULT 0,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE trainer (
    trainer_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(300),
    password varchar(300),
    birth_date DATE,
    gender VARCHAR(45)
);

CREATE TABLE dietitian (
    dietitian_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(300),
    password varchar(300),
    birth_date DATE,
    gender VARCHAR(45)
);


CREATE TABLE athlete (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(300),
    password varchar(300),
    birth_date DATE,
    gender VARCHAR(45),
    height DECIMAL(10,2),
    weight DECIMAL(10,2),
    trainer_id INTEGER,
    dietitian_id INTEGER,
    FOREIGN KEY (trainer_id) REFERENCES trainer(trainer_id),
    FOREIGN KEY (dietitian_id) REFERENCES dietitian(dietitian_id)
);

CREATE TABLE routine (
    id_routine INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    description VARCHAR(500),
    trainer_id INTEGER,
    athlete_id INTEGER,
    FOREIGN KEY (trainer_id) REFERENCES trainer(trainer_id),
    FOREIGN KEY (athlete_id) REFERENCES athlete(id)
);

CREATE TABLE training_session (
    id_training_session INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    description VARCHAR(500),
    session_date DATE NOT NULL,
    trainer_notes VARCHAR(500),
    routine_id INTEGER,
    FOREIGN KEY (routine_id) REFERENCES routine(id_routine)
);

CREATE TABLE exercise  (
    id_exercise INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    description VARCHAR(500),
    muscle_group VARCHAR(200),
    trainer_id INTEGER,
    FOREIGN KEY (trainer_id) REFERENCES trainer(trainer_id)
);

CREATE TABLE execution (
    id_execution INTEGER PRIMARY KEY AUTO_INCREMENT,
    num_set INTEGER,
    rpe INTEGER,
    rir INTEGER,
    done BOOLEAN NOT NULL DEFAULT 0,
    training_session_id INTEGER,
    exercise_id INTEGER,
    FOREIGN KEY (training_session_id) REFERENCES training_session(id_training_session),
    FOREIGN KEY (exercise_id) REFERENCES exercise(id_exercise)
);

CREATE TABLE nutritional_plan (
    id_nutritional_plan INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    description VARCHAR(500),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    dietitian_id INTEGER,
    athlete_id INTEGER,
    FOREIGN KEY (dietitian_id) REFERENCES dietitian(dietitian_id),
    FOREIGN KEY (athlete_id) REFERENCES athlete(id)
);

CREATE TABLE meal (
    id_meal INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    description VARCHAR(500),
    recipe VARCHAR(500),
    calories INTEGER,
    protein INTEGER,
    carbohydrates INTEGER,
    fat INTEGER,
    dietitian_id INTEGER,
    FOREIGN KEY (dietitian_id) REFERENCES dietitian(dietitian_id)
);

CREATE TABLE meal_record (
    id_meal_record INTEGER PRIMARY KEY AUTO_INCREMENT,
    date DATE NOT NULL,
    quantity INTEGER,
    eaten BOOLEAN NOT NULL DEFAULT 0,
    meal_id INTEGER,
    nutritional_plan_id INTEGER,
    FOREIGN KEY (meal_id) REFERENCES meal(id_meal),
    FOREIGN KEY (nutritional_plan_id) REFERENCES nutritional_plan(id_nutritional_plan)
);
