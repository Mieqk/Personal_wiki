"""Десктопный запуск: нативное окно, без браузера и ручного сервера."""
import argparse
import threading
import time
import urllib.request
import webbrowser

import webview

# Глушим автооткрытие браузера, если main.py пытается это сделать
webbrowser.open = lambda *args, **kwargs: False

import main


def _start_server():
    # Вариант 1: старая архитектура с cmd_serve
    if hasattr(main, 'cmd_serve'):
        args = argparse.Namespace(source='notes', port='8000')
        main.cmd_serve(args)
        return

    # Вариант 2: новая архитектура с модульным app
    if hasattr(main, 'app'):
        for build_fn in ('build_site', 'rebuild_index', 'build'):
            fn = getattr(main, build_fn, None)
            if callable(fn):
                try:
                    fn()
                except Exception as e:
                    print(f'build warning: {e}')
                break
        main.app.run(host='127.0.0.1', port=8000)
        return

    raise RuntimeError('Не нашёл, как запустить сервер из main.py')


def entry():
    threading.Thread(target=_start_server, daemon=True).start()

    # Ждём, пока сервер поднимется (до 15 секунд)
    for _ in range(30):
        try:
            urllib.request.urlopen('http://127.0.0.1:8000')
            break
        except Exception:
            time.sleep(0.5)

    webview.create_window('Personal Wiki', 'http://127.0.0.1:8000')
    webview.start()


if __name__ == '__main__':
    entry()