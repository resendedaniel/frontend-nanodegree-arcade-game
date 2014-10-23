var Engine = (function(global) {
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        patterns = {},
        lastTime;

    canvas.width = 808;
    canvas.height = 606;
    doc.body.appendChild(canvas);

    function main() {
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        update(dt);
        render();

        lastTime = now;
        win.requestAnimationFrame(main);
    };

    function init() {
        reset();
        lastTime = Date.now();
        main();
    }

    function update(dt) {
        updateEntities(dt);
        checkCollisions();
        checkAwards();
    }

    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        player.update();
    }

    function checkCollisions() {
        allEnemies.forEach(function(enemy) {
            if(Math.pow(Math.pow(enemy.x - player.x, 2) + Math.pow(enemy.y - player.y, 2), .5) < 1) {
                reset();
            }
        });
    }

    function checkAwards() {
        removeToBeGems = [];
        allGems.forEach(function(gem) {
            if(Math.pow(Math.pow(gem.x - player.x, 2) + Math.pow(gem.y - player.y, 2), .5) < 1) {
                player.points++;
                // I would like to remove this gem and place another one,
                // But it doesn't seem right to remove one element during the loop
                removeToBeGems.push(gem);
            }
        });
        removeToBeGems.forEach(function(gem) {
            var index = allGems.indexOf(gem);
            allGems.splice(index, 1);
            allGems.push(new Gem);
        })
    }

    function render() {
        var rowImages = [
                'images/water-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/grass-block.png',
                'images/grass-block.png'
            ],
            numRows = 6,
            numCols = 8,
            row, col;

        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }

        renderEntities();
    }

    function renderEntities() {
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });
        allGems.forEach(function(gem) {
            gem.render();
        });
        player.render();
    }

    function reset() {
        debugger;
        player = new Player();
        allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy()];
        allGems = [new Gem(), new Gem()];
    }

    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/Gem-Blue.png',
        'images/Gem-Green.png',
        'images/Gem-Orange.png',
        'images/enemy-bug.png',
        'images/char-boy.png',
<<<<<<< HEAD
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png'
=======
        'images/char-horn-girl.png'
>>>>>>> 5ef1915ff1ceab62084eeaac9996ffbe2f8cdcec
    ]);
    Resources.onReady(init);

    global.ctx = ctx;
})(this);
