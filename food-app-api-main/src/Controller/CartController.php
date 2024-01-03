<?php

namespace App\Controller;

use App\Entity\Cart;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class CartController
{
    private EntityManagerInterface $entityManager;
    function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }
    #[Route('/carts/{id}/add_food', name: 'add_food', methods: ['POST'])]
    public function addFood(Request $request,  ?int $id): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $foodId = $data['foodId'];


        $cart = $this->entityManager->getRepository(Cart::class)->find($id);

        if ($this->isFoodAlreadyInCart($cart , $foodId)) {
            return new JsonResponse(['code' => JsonResponse::HTTP_CONFLICT, "message" => "food is already in cart"], JsonResponse::HTTP_CONFLICT);
        }

        $cart->addFoodItem($foodId);

        $this->entityManager->persist($cart);
        $this->entityManager->flush();

        return new JsonResponse(['code' => JsonResponse::HTTP_CREATED, "message" => "food was added to the cart successfully"], JsonResponse::HTTP_CREATED);
    }

    #[Route('/carts/{id}/remove_food', name: 'remove_food', methods: ['POST'])]
    public function removeFood(Request $request,  ?int $id): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $foodId = $data['foodId'];


        $cart = $this->entityManager->getRepository(Cart::class)->find($id);

        if (!$this->isFoodAlreadyInCart($cart , $foodId)) {
            return new JsonResponse(['code' => JsonResponse::HTTP_NOT_FOUND, "message" => "food is not in cart"], JsonResponse::HTTP_NOT_FOUND);
        }

        $cart->removeFoodItem((string)$foodId);

        $this->entityManager->persist($cart);
        $this->entityManager->flush();

        return new JsonResponse(['code' => JsonResponse::HTTP_OK, "message" => "food was removed from the cart successfully"], JsonResponse::HTTP_OK);
    }

    public function isFoodAlreadyInCart(Cart $cart, string $foodItem): bool
    {
        return in_array($foodItem, $cart->getFoodItems(), true);
    }
}
