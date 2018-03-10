// ===================== Пример кода первой двери =======================
/**
 * @class Door0
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Door0(number, onUnlock) {
    DoorBase.apply(this, arguments);

    var buttons = [
        this.popup.querySelector('.door-riddle__button_0'),
        this.popup.querySelector('.door-riddle__button_1'),
        this.popup.querySelector('.door-riddle__button_2')
    ];

    var checkCircles = [
        this.popup.querySelector('.check-points__circle_0'),
        this.popup.querySelector('.check-points__circle_1'),
        this.popup.querySelector('.check-points__circle_2'),
    ];

    buttons.forEach(function(b) {
        b.addEventListener('pointerdown', _onButtonPointerDown.bind(this));
        b.addEventListener('pointerup', _onButtonPointerUp.bind(this));
        b.addEventListener('pointercancel', _onButtonPointerUp.bind(this));
        b.addEventListener('pointerleave', _onButtonPointerUp.bind(this));
    }.bind(this));

    function _onButtonPointerDown(e) {
        var startYCoord = e.pageY;
        e.target.classList.add('door-riddle__button_pressed');

        e.target.addEventListener('pointermove', _moveBtnY.bind(this, startYCoord));
    }

    function _onButtonPointerUp(e) {
        e.target.classList.remove('door-riddle__button_pressed');
        resetBtnMovement(e.target);
    }

    function _moveBtnY(startYCoord, e) {
        e.target.style.transform = 'translateY('+(e.pageY - startYCoord - e.height / 2)+'px)';
        checkCondition.apply(this, [e]);
    }

    function resetBtnMovement(btn) {
        btn.style.transform = 'none';
        checkCircles.forEach(function(c) {
            c.classList.remove('in-focus');
            c.setAttribute('data-checked', '0');
        });
    }

    /**
     * Проверяем, можно ли теперь открыть дверь
     */
    function checkCondition(e) {
        var self = this, 
            btn = e.target,
            btnTop = getCoords(btn).top,
            btnBottom = btnTop + btn.offsetHeight,
            btnNum = btn.getAttribute('data-num'),
            circleTop,
            circleBottom,
            circleNum,
            isAllChecked;

        checkCircles.forEach(function(c) {
            circleNum = c.getAttribute('data-num');
            if (btnNum !== circleNum) {
                return;
            } 
            circleTop = getCoords(c).top;
            circleWidth = c.offsetWidth;
            circleBottom = circleTop + circleWidth;

            if (btnBottom < circleBottom && btnTop > circleTop) {
                c.classList.add('in-focus');
                c.setAttribute('data-checked', '1');
            } else {
                c.classList.remove('in-focus');
                c.setAttribute('data-checked', '0');
            }

            isAllChecked = checkAllCircles();
            if (isAllChecked) {
                self.unlock();
            }
        });

        // если все три кнопки встали в свои кружочки
        function checkAllCircles() {
            return checkCircles.every(function(c) {
                return +c.getAttribute('data-checked') === 1;
            });
        }
    }

    function getCoords(elem) {
        var box = elem.getBoundingClientRect();
      
        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    }
}

// Наследуемся от класса DoorBase
Door0.prototype = Object.create(DoorBase.prototype);
Door0.prototype.constructor = DoorBase;
// END ===================== Пример кода первой двери =======================

/**
 * @class Door1
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Door1(number, onUnlock) {
    DoorBase.apply(this, arguments);

    // ==== Напишите свой код для открытия второй двери здесь ====
    // Для примера дверь откроется просто по клику на неё

    var buttons = [
        this.popup.querySelector('.door-riddle__button_0'),
        this.popup.querySelector('.door-riddle__button_1'),
        this.popup.querySelector('.door-riddle__button_2'),
        this.popup.querySelector('.door-riddle__button_3')
    ];

    buttons.forEach(function(b) {
        b.addEventListener('pointerdown', _onButtonPointerDown.bind(this));
        b.addEventListener('pointerup', _onButtonPointerUp.bind(this));
        b.addEventListener('pointercancel', _onButtonPointerUp.bind(this));
        b.addEventListener('pointerleave', _onButtonPointerUp.bind(this));
        // b.addEventListener('pointermove', _onButtonPointerMove.bind(this));
    }.bind(this));

    function _onButtonPointerDown(e) {
        e.target.classList.add('door-riddle__button_pressed');
    }

    function _onButtonPointerUp(e) {
        e.target.classList.remove('door-riddle__button_pressed');
    }

    // function _onButtonPointerMove(e) {
    //     console.log(e);
    // }

    function checkCondition() {
        var isOpened = true;
        buttons.forEach(function(b) {
            if (!b.classList.contains('door-riddle__button_pressed')) {
                isOpened = false;
            }
        });

        // Если все три кнопки зажаты одновременно, то откроем эту дверь
        if (isOpened) {
            this.unlock();
        }
    }

    // ==== END Напишите свой код для открытия второй двери здесь ====
}
Door1.prototype = Object.create(DoorBase.prototype);
Door1.prototype.constructor = DoorBase;

/**
 * @class Door2
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Door2(number, onUnlock) {
    DoorBase.apply(this, arguments);

    // ==== Напишите свой код для открытия третей двери здесь ====
    // Для примера дверь откроется просто по клику на неё
    this.popup.addEventListener('click', function() {
        this.unlock();
    }.bind(this));
    // ==== END Напишите свой код для открытия третей двери здесь ====
}
Door2.prototype = Object.create(DoorBase.prototype);
Door2.prototype.constructor = DoorBase;

/**
 * Сундук
 * @class Box
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Box(number, onUnlock) {
    DoorBase.apply(this, arguments);

    // ==== Напишите свой код для открытия сундука здесь ====
    // Для примера сундук откроется просто по клику на него
    this.popup.addEventListener('click', function() {
        this.unlock();
    }.bind(this));
    // ==== END Напишите свой код для открытия сундука здесь ====

    this.showCongratulations = function() {
        alert('Поздравляю! Игра пройдена!');
    };
}
Box.prototype = Object.create(DoorBase.prototype);
Box.prototype.constructor = DoorBase;
