import 'package:flutter/material.dart';
import '../widgets/chat_bubble.dart';

class HomePage extends StatefulWidget {
  final String token;

  const HomePage({super.key, required this.token});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final input = TextEditingController();
  final List<Map<String, String>> messages = [];

  String bot(String msg) {
    msg = msg.toLowerCase();

    if (msg.contains("hola")) return "Hola 👋";
    if (msg.contains("menu")) return "🍕 🍔 🌭";
    if (msg.contains("pizza")) return "Pizza $20.000";

    return "No entendí 😅";
  }

  void send() {
    final text = input.text;
    if (text.isEmpty) return;

    setState(() {
      messages.add({"type": "user", "text": text});
    });

    input.clear();

    Future.delayed(const Duration(milliseconds: 500), () {
      setState(() {
        messages.add({"type": "bot", "text": bot(text)});
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("FoodBot 🤖")),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              itemCount: messages.length,
              itemBuilder: (_, i) {
                final msg = messages[i];
                return ChatBubble(
                  text: msg["text"]!,
                  isUser: msg["type"] == "user",
                );
              },
            ),
          ),
          Row(
            children: [
              Expanded(
                child: TextField(controller: input),
              ),
              IconButton(
                icon: const Icon(Icons.send),
                onPressed: send,
              )
            ],
          )
        ],
      ),
    );
  }
}