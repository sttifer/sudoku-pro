class SudokuCore {
    constructor() {
        this.grid = [];
        this.solution = [];
    }

    generate(difficulty) {
        this.grid = Array.from({ length: 9 }, () => Array(9).fill(0));
        this.solve(this.grid);
        this.solution = this.grid.map(row => [...row]);
        const cellsToRemove = 20 + (difficulty * 5);
        this.pokeHoles(cellsToRemove);
        return this.grid;
    }

    solve(grid) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (grid[row][col] === 0) {
                    let nums = [1,2,3,4,5,6,7,8,9].sort(() => Math.random() - 0.5);
                    for (let num of nums) {
                        if (this.isValid(grid, row, col, num)) {
                            grid[row][col] = num;
                            if (this.solve(grid)) return true;
                            grid[row][col] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    isValid(grid, row, col, num) {
        for (let i = 0; i < 9; i++) {
            const mRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
            const mCol = 3 * Math.floor(col / 3) + i % 3;
            if (grid[row][i] === num || grid[i][col] === num || grid[mRow][mCol] === num) return false;
        }
        return true;
    }

    pokeHoles(count) {
        let removed = 0;
        while (removed < count) {
            let r = Math.floor(Math.random() * 9);
            let c = Math.floor(Math.random() * 9);
            if (this.grid[r][c] !== 0) {
                this.grid[r][c] = 0;
                removed++;
            }
        }
    }
}