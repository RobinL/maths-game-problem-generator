/**
 * Utility functions for math problem generation
 */
const Helpers = {
    /**
     * Generate a random integer between min and max (inclusive)
     * @param {number} min - Minimum value
     * @param {number} max - Maximum value
     * @returns {number} Random integer
     */
    getRandomInt: function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    /**
     * Select an item from a weighted distribution
     * @param {Object} distribution - Object with keys and their probability weights
     * @returns {string} Selected key
     */
    selectFromDistribution: function (distribution) {
        const rand = Math.random();
        let cumulativeProbability = 0;

        for (const [key, probability] of Object.entries(distribution)) {
            cumulativeProbability += probability;
            if (rand < cumulativeProbability && probability > 0) {
                return key;
            }
        }

        // Return the first key as fallback
        return Object.keys(distribution)[0];
    }
};

export default Helpers;