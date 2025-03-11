/**
 * Class to define difficulty levels and points
 */
export default class DifficultyLevel {
    /**
     * Create a new difficulty level
     * @param {string} name - The name of the difficulty level
     * @param {number} points - Points awarded for problems of this difficulty
     */
    constructor(name, points) {
        this.name = name;
        this.points = points;
    }

    /**
     * Get points for this difficulty level
     * @returns {number} Points value
     */
    getPoints() {
        return this.points;
    }
}

/**
 * Pre-defined difficulty levels based on UK primary school age-related expectations
 */
export const DIFFICULTY_LEVELS = {
    reception: new DifficultyLevel('reception', 10),
    year1: new DifficultyLevel('year1', 15),
    year2: new DifficultyLevel('year2', 20),
    year3: new DifficultyLevel('year3', 25),
    year4: new DifficultyLevel('year4', 30)
};