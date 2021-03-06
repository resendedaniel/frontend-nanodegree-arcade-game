var Engine = (function(global) {
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        patterns = {},
        lastTime,
        record = 0,
        numRows = 6,
        numCols = 10;

    canvas.width = numCols * 101;
    canvas.height = numRows * 101;
    doc.getElementById('canvas').appendChild(canvas);

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
            distance = Math.pow(Math.pow(enemy.x - player.x, 2) + Math.pow(enemy.y - player.y, 2), .5);
            if((distance < .67 & player.x > enemy.x) | (distance < .25 & player.x < enemy.x)) {
                reset();
            }
        });
    }

    function checkAwards() {
        removeToBeGems = [];
        allGems.forEach(function(gem) {
            if(Math.pow(Math.pow(gem.x - player.x, 2) + Math.pow(gem.y - player.y, 2), .5) < 1) {
                d3.select("#pontuation").select("span").text("0 points");
                d3.select("#pontuation").select("span").text(++player.points + " points");
                record = Math.max(record, player.points);
                d3.select("#record").select("span").text(record + " points");

                var spawn = (player.points % 10) * 10;
                d3.select('.progress-bar').style("width", spawn + "%")
                if(player.points % 10 == 0) {
                    allEnemies.push(new Enemy());
                };
                // I would like to remove this gem and place another one,
                // But it doesn't seem right to remove one element during the loop
                removeToBeGems.push(gem);

                //Increase speed
                allEnemies.forEach(function(enemy) {
                    enemy.increaseSpeed();
                })
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
        player = new Player($('#control label.active input').attr("id"));
        allEnemies = [new Enemy()];//[new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy()];
        allGems = [new Gem(), new Gem()];
        d3.select("#pontuation").select("span").text("0 points");
        d3.select('.progress-bar').style("width", "0%")
    }

    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/Gem-Blue.png',
        'images/Gem-Green.png',
        'images/Gem-Orange.png',
        'images/enemy-bug.png',
        'images/char-lucas.png',
        'images/char-nina.png',
        'images/char-babi.png'
    ]);

    Resources.onReady(init);

    global.ctx = ctx;
})(this);
