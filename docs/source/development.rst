.. _development:

******************
Rozwój
******************

W tym dokumencie opisujemy opis procesu rozwoju aplikacji. Ma on postać FAQ, aby zapewnić łatwe jego utrzymanie.

Jak zgłosić usterkę?
--------------------

Jeśli napotkasz jakiekolwiek błędy z narzędziem, proszę zgłosić problem poprzez system zgłoszeń w panelu administracyjnym lub zakładkę "Issues" w `repozytorium`_.

.. _repozytorium: https://github.com/hyperonecom/h1-cli

Jak wygenerować dokumentacje?
-----------------------------

Do prawidłowego wygenerowania dokumentacji wymagane jest wykonanie odpowiednich zależności. W środowisku deweloperskim można to osiągnąć poprzez::

    $ pip install sphinx

Następnie należy przejść do katalogu ``docs`` i wywołać::

    $ make html