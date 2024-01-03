<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\CartRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CartRepository::class)]
#[ApiResource(
    itemOperations: [
        'get',
        'addFood' => [
            'method' => 'POST',
            'path' => '/carts/{id}/add_food',
            'controller' => 'App\Controller\CartController::addFood',
        ],
        'removeFood' => [
            'method' => 'POST',
            'path' => '/carts/{id}/remove_food',
            'controller' => 'App\Controller\CartController::removeFood',
        ]
    ] 
)]
class Cart
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['read:user'])]
    private ?int $id = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['read:user'])]
    private ?array $foodItems = [];

    #[ORM\OneToOne(mappedBy: 'cart', cascade: ['persist', 'remove'])]
    private ?User $user = null;



    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFoodItems(): ?array
    {
        return $this->foodItems;
    }

    public function addFoodItem(?string $foodItem): static
    {
        $this->foodItems[] = $foodItem;

        return $this;
    }

    public function removeFoodItem(?string $foodItem): static
    {
        $index = array_search($foodItem, $this->foodItems, true);

        if ($index !== false) {
            unset($this->foodItems[$index]);
        }

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(User $user): static
    {
        // set the owning side of the relation if necessary
        if ($user->getCart() !== $this) {
            $user->setCart($this);
        }

        $this->user = $user;

        return $this;
    }




}
