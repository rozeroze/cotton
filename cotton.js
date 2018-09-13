(() => {

    const _c = _class => document.getElementsByClassName(_class);

    // textbox欄のmaxlength属性を拡張する utf-8
    {
        //let _utf8 = document.getElementsByClassName('ctn-text-utf8');
        let _utf8 = _c('ctn-text-utf8');
        for (let item of _utf8)
        {
            item.addEventListener('change', e => {
                e.target.classList.remove('ctn-text-invalid');
                let max = Number(e.target.getAttribute('ctn-maxbyte'));
                if (!max) { return; }
                let type = '';
                if (e.target.classList.contains('ctn-text-leftbyte')) { type = 'leftbyte'; }
                if (e.target.classList.contains('ctn-text-highlight')) { type = 'highlight'; }
                let text = e.target.value;
                let cnt = 0;
                let c = '';
                let t = '';
                var tbl = [ 0, 1, 1, 1, 2, 3, 2, 3, 4, 3 ];
                for (let i = 0; i < text.length; i++) {
                    c = text.charAt(i);
                    cnt += tbl[encodeURIComponent(c).length];
                    if (max < cnt) {
                        if (type == 'leftbyte') { e.target.value = t; }
                        if (type == 'highlight') {
                            if (t != text) { e.target.classList.add('ctn-text-invalid'); }
                        }
                        return;
                    }
                    t += c;
                }
            }, false);
        }
    }

    // textbox欄のmaxlength属性を拡張する utf16
    {
        //let _utf16 = document.getElementsByClassName('ctn-text-utf16');
        let _utf16 = _c('ctn-text-utf16');
        for (let item of _utf16)
        {
            item.addEventListener('change', e => {
                e.target.classList.remove('ctn-text-invalid');
                let max = Number(e.target.getAttribute('ctn-maxbyte'));
                if (!max) { return; }
                let type = '';
                if (e.target.classList.contains('ctn-text-leftbyte')) { type = 'leftbyte'; }
                if (e.target.classList.contains('ctn-text-highlight')) { type = 'highlight'; }
                let text = e.target.value;
                let cnt = 0;
                let t = '';
                for (let c of Array.from(text)) {
                    cnt += c.length * 2;
                    if (max < cnt) {
                        if (type == 'leftbyte') { e.target.value = t; }
                        if (type == 'highlight') {
                            if (t != text) { e.target.classList.add('ctn-text-invalid'); }
                        }
                        return;
                    }
                    t += c;
                }
            }, false);
        }
    }

    // textbox欄のmaxlength属性を拡張する sjis
    {
        //let _sjis = document.getElementsByClassName('ctn-text-sjis');
        let _sjis = _c('ctn-text-sjis');
        for (let item of _sjis)
        {
            item.addEventListener('change', e => {
                e.target.classList.remove('ctn-text-invalid');
                let max = Number(e.target.getAttribute('ctn-maxbyte'));
                if (!max) { return; }
                let type = '';
                if (e.target.classList.contains('ctn-text-leftbyte')) { type = 'leftbyte'; }
                if (e.target.classList.contains('ctn-text-highlight')) { type = 'highlight'; }
                let text = e.target.value;
                let cnt = 0;
                let c = '';
                let t = '';
                for (let i = 0; i < text.length; i++) {
                    c = text.charCodeAt(i);
                    if ((c >= 0x0 && c < 0x81) || (c === 0xf8f0) || (c >= 0xff61 && c < 0xffa0) || (c >= 0xf8f1 && c < 0xf8f4)) {
                        cnt += 1;
                    } else {
                        cnt += 2;
                    }
                    if (max < cnt) {
                        if (type == 'leftbyte') { e.target.value = t; }
                        if (type == 'highlight') {
                            if (t != text) { e.target.classList.add('ctn-text-invalid'); }
                        }
                        return;
                    }
                    t += text.charAt(i);
                }
            }, false);
        }
    }

    // checkboxにrequire属性を付加する
    {
        //let _chk = document.getElementsByClassName('ctn-check-require');
        let _chk = _c('ctn-check-require');
        for (let item of _chk)
        {
            item.addEventListener('change', e => {
                if (e.target.checked) {
                    e.target.classList.remove('ctn-check-invalid');
                } else {
                    e.target.classList.add('ctn-check-invalid');
                }
            }, false);
        }
    }

    // submitの前にcottonのチェックを行なう
    {
        let _frm = _c('ctn-form');
        for (let item of _frm) {
            item.addEventListener('submit', e => {
                e.preventDefault();
                let _evt = document.createEvent('HTMLEvents');
                _evt.initEvent('change', false, false);
                let _inputs = e.target.querySelectorAll('.ctn-text-utf8, .ctn-text-utf16, .ctn-text-sjis, .ctn-check-require');
                for (let _input of _inputs) {
                    _input.dispatchEvent(_evt);
                }
                let _invalid = e.target.querySelectorAll('.ctn-text-invalid, .ctn-check-invalid');
                if (_invalid.length == 0) {
                    e.target.submit();
                }
            }, false);
        }
    }

})()

