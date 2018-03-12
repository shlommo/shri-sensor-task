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

    buttons.forEach(function(b) {
        b.addEventListener('pointerdown', _onButtonPointerDown.bind(this));
        b.addEventListener('pointerup', _onButtonPointerUp.bind(this));
        b.addEventListener('pointercancel', _onButtonPointerUp.bind(this));
        b.addEventListener('pointerleave', _onButtonPointerUp.bind(this));
    }.bind(this));

    function _onButtonPointerDown(e) {
        e.target.classList.add('door-riddle__button_pressed');
        checkCondition.apply(this);
    }

    function _onButtonPointerUp(e) {
        e.target.classList.remove('door-riddle__button_pressed');
    }

    /**
     * Проверяем, можно ли теперь открыть дверь
     */
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
        dropAllCirclesStatus();
    }

    function _moveBtnY(startYCoord, e) {
        e.target.style.transform = 'translateY('+(e.pageY - startYCoord - e.height / 2)+'px)';
        checkCondition.call(this, e);
    }

    function resetBtnMovement(btn) {
        btn.style.transform = 'none';
    }

    function dropAllCirclesStatus() {
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
                dropAllCirclesStatus();
            }
        });

        // если все три кнопки встали в свои кружочки 
        function checkAllCircles() {
            return checkCircles.every(function(c) {
                return +c.getAttribute('data-checked') === 1;
            });
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
    // Эмуляция жеста "spread"(увеличение)
    var baseV = 0,
        sampleCircle = document.querySelector('.helpers__circle');

    var buttons = [
        this.popup.querySelector('.door-riddle__button_0'),
    ];

    buttons.forEach(function(b) {
        b.addEventListener('pointerdown', _onButtonPointerDown.bind(this));
        b.addEventListener('pointerup', _onButtonPointerUp.bind(this));
        b.addEventListener('pointercancel', _onButtonPointerUp.bind(this));
        b.addEventListener('pointerleave', _onButtonPointerUp.bind(this));
    }.bind(this));


    function _onButtonPointerDown(e) {
        baseV = e.target.offsetWidth; 
        e.target.classList.add('door-riddle__button_pressed');
        e.target.addEventListener('pointermove', _onButtonPointerMove.bind(this));
    }

    function _onButtonPointerUp(e) {
        e.target.classList.remove('door-riddle__button_pressed');
        e.target.removeEventListener('pointermove', _onButtonPointerMove.bind(this));
        firstEvent = null;
        firstPointerId = null;
        e.target.style.width = baseV + 'px';
        e.target.style.height = baseV + 'px';
        e.target.style.backgroundColor = '#583319';
    }

    var firstPointerId = null,
        firstEvent = null;
    function _onButtonPointerMove(e) {
        if (typeof firstPointerId === 'number' && e.pointerId !== firstPointerId) {
            _onButtonPointerSpread.apply(this, [firstEvent, e]);
        } 
        firstPointerId = e.pointerId;
        firstEvent = e;
    }

    function _onButtonPointerSpread(eventOne, eventTwo) {
        var pageXOne = eventOne.pageX,
            pageYOne = eventOne.pageY,
            pageXTwo = eventTwo.pageX,
            pageYTwo = eventTwo.pageY,
            xv = Math.max(pageXOne, pageXTwo) - Math.min(pageXOne, pageXTwo),
            yv = Math.max(pageYOne, pageYTwo) - Math.min(pageYOne, pageYTwo),
            mv = Math.max(xv, yv),
            circle = eventOne.target,
            cv = circle.offsetWidth / 2;

        if (mv > cv / 4) {
            circle.style.width = (cv * 2 + (mv - cv) / 20) + 'px';
            circle.style.height = (cv * 2 + (mv - cv) / 20) + 'px';
        }

        if (cv * 2 < sampleCircle.offsetWidth / 2) {
            circle.style.backgroundColor = '#FF4136';
        } else if (cv * 2 < sampleCircle.offsetWidth / 1.8) {
            circle.style.backgroundColor = '#B10DC9';
        } else if (cv * 2 < sampleCircle.offsetWidth / 1.2) {
            circle.style.backgroundColor = '#0074D9';
        } else if (cv * 2 < sampleCircle.offsetWidth / 1.1) {
            circle.style.backgroundColor = '#2ECC40';
        } 

        if (cv * 2 > sampleCircle.offsetWidth) {
            this.unlock();
        }
    }
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
    var button = this.popup.querySelector('.door-riddle__button_0'),
        helperPig = document.querySelector('.helpers__pig'),
        isTouched = false,
        firstEvent = null;

    function addEventListeners(context, b) {
        b.addEventListener('pointerdown', _onButtonPointerDown.bind(context));
        b.addEventListener('pointerup', _onButtonPointerUp.bind(context));
        b.addEventListener('pointercancel', _onButtonPointerUp.bind(context));
        b.addEventListener('pointerleave', _onButtonPointerUp.bind(context));
    }

    addEventListeners(this, button);

    function _onButtonPointerDown(e) {
        if (!isTouched) {
            isTouched = true;
            firstEvent = e;
            return;
        }

        runRotateEvent.apply(this, [firstEvent, e]);
    }

    function _onButtonPointerUp(e) {
        helperPig.style.transform = `none`;
        isTouched = false;
        firstEvent = null;
    }

    function runRotateEvent(firstEvent, secondEvent) {
        var _pigPointerMoveEvent = function(moveEvent) {
            return _onButtonPointerMove.apply(this, [firstEvent, moveEvent])
        };

        var _pigPoinerUpEvent = function(e) {
            var oldElement = e.target;
            var newElement = oldElement.cloneNode(true);
            oldElement.parentNode.replaceChild(newElement, oldElement);
            isTouched = false;
            firstEvent = null;
            addEventListeners(this, newElement);
        };

        secondEvent.target.addEventListener('pointermove', _pigPointerMoveEvent.bind(this));
        secondEvent.target.addEventListener('pointerup', _pigPoinerUpEvent.bind(this));
        secondEvent.target.addEventListener('pointercancel', _pigPoinerUpEvent.bind(this));
        secondEvent.target.addEventListener('pointerleave', _pigPoinerUpEvent.bind(this));
    }

    function _onButtonPointerMove(firstEvent, moveEvent) {
        /** 
         * TODO: Вынести в функцию
        */
        var circle = moveEvent.target,
            circleWidth = circle.offsetWidth,
            circleCoords = getCoords(circle),
            circleTopLeft = {
                x: circleCoords.left,
                y: circleCoords.top
            },
            circleTopRight = {
                x: circleTopLeft.x + circleWidth,
                y: circleTopLeft.y
            },
            circeBottomLeft = {
                x: circleTopLeft.x,
                y: circleTopLeft.y + circleWidth
            },
            circleBottomRight = {
                x: circleTopLeft.x,
                y: circleTopLeft.y + circleWidth
            },
            systemCenter = {
                x: circleTopLeft.x + circleWidth / 2,
                y: circleTopLeft.y + circleWidth / 2 
            };
       
        var triangle = calculatePointLines(systemCenter, moveEvent.pageX, moveEvent.pageY),
            quarter = findPolarCoordinateSystemQuarter(systemCenter, moveEvent.pageX, moveEvent.pageY),
            rotateValue = calculateAngle(triangle, quarter);

        helperPig.style.transform = `rotate(${rotateValue}deg)`;
        if (rotateValue > 350) {
            this.unlock();
            _onButtonPointerUp();
        }
    }

    // функция для вычесления четверти в системе координат
    function findPolarCoordinateSystemQuarter(systemCenter, x, y) {            
        // центр сетки координат
        var c = systemCenter,
            quarter = null;
        if (x > c.x && y < c.y) {
            quarter = 1;
        } else if (x > c.x && y > c.y) {
            quarter = 2;
        } else if (x < c.x && y > c.y) {
            quarter = 3;
        } else {
            quarter = 4;
        }

        return quarter;
    }
    
    // вычесление длины отрезков для нахождения угла
    function calculatePointLines(systemCenter, x, y) {
        var triangle = {},
            c = systemCenter,
            opposite, // противоположный катет
            adjacent, // прилежащий катет
            hypotenuse; // гипотенуза

        opposite = Math.max(c.y, y) - Math.min(c.y, y);
        adjacent = Math.max(c.x, x) - Math.min(c.x, x);
        hypotenuse = Math.pow((Math.pow(opposite, 2) + Math.pow(adjacent, 2)), 1/2);

        return {
            hyp: hypotenuse,
            adj: adjacent
        };
    }
        
    function calculateAngle(triangle, quarter) {
        var angle = 0,
            angleRad = 0;

        angleRad = Math.atan(triangle.hyp / triangle.adj); // угол в радианах 
        angle = angleRad * 180 / Math.PI; // угол в градусах

        // в зависимости от четверти, перевести в градусы для transform rotate
        switch(quarter) {
            case 1:
                angle = 90 - angle;
                break;
            case 2:
                angle = 90 + angle;
                break;
            case 3:
                angle = 270 - angle;
                break;
            case 4:
                angle = 270 + angle;
                break;
        }

        return angle;
    }

    // ==== END Напишите свой код для открытия сундука здесь ====

    this.showCongratulations = function() {
        alert('Поздравляю! Игра пройдена!');
    };
}
Box.prototype = Object.create(DoorBase.prototype);
Box.prototype.constructor = DoorBase;

function getCoords(elem) {
    var box = elem.getBoundingClientRect();
  
    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };
}
