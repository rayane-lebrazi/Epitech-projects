def ship(*args, **kwargs):
    for arg in args:
        print(arg)

    for key, value in kwargs.items():
        print(f"{key}: {value}")


ship("Batman", street="Mountain Drive", city="Gotham")

ship(
    "Superman",
    "The man of steel",
    apartment="3D",
    num=344,
    street="Clinton Street",
    city="Metropolis"
)
