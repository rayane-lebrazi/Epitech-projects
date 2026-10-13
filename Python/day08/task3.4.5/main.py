import pygame

pygame.init()

screen = pygame.display.set_mode((600, 600))

background = pygame.image.load("background.jpg")
background = pygame.transform.scale(background, (600, 600))

running = True

while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    screen.blit(background, (0, 0))
    pygame.display.flip()
pygame.quit()